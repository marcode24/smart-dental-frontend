import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { StatusRecord } from '@enums/status-record.enum';

import { Appointment } from '@models/appointment.model';
import { Patient } from '@models/patient.model';
import { Record } from '@models/record.model';
import { Tooth } from '@models/tooth.model';

import { AppointmentService } from '@services/appointment.service';
import { PatientService } from '@services/patient.service';
import { RecordService } from '@services/record.service';
import { ServiceOfferService } from '@services/service-offer.service';
import { ToothService } from '@services/tooth.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styles: [
  ]
})
export class RecordComponent implements OnInit, OnDestroy {

  public patientTemp: Patient;
  public patientRecordHome: Record[];
  public patientRecord: Record[];
  public patientTeeth: Tooth[];
  public patientAppointments: Appointment[];

  private clickRecord: boolean = false;
  public clickOdontogram: boolean = false;
  public clickAppointment: boolean = false;

  private recordsHome: Subscription;
  private records: Subscription;

  constructor(
    private patientService: PatientService,
    private recordService: RecordService,
    private serviceOfferService: ServiceOfferService,
    private toothService: ToothService,
    private appointmentService: AppointmentService
  ) {
    this.patientTemp = this.patientService.patientTemp;
  }

  ngOnDestroy(): void {
    this.recordsHome.unsubscribe();
    this.records.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllRecords(1);
    this.recordsHome = this.recordService.changedRecordsHome.subscribe(resp => {
      if(resp) {
        this.getAllRecords(1);
        this.getAllTeeth();
      }
    });
    this.records = this.recordService.changedRecords.subscribe(resp => (resp) ? this.getAllRecords(2) : '');
  }

  getServicesActive() {
    this.serviceOfferService.getServicesActive(false);
  }

  // click tab record
  getRecords() {
    if(this.clickRecord === false) {
      this.getAllRecords(2);
    }
    this.clickRecord = true;
  }

  // click tab odontogram
  getTeeth() {
    if(this.clickOdontogram === false) {
      this.getAllTeeth();
    }
    this.clickOdontogram = true;
  }

  // click tab appointments
  getAppointments() {
    if(this.clickAppointment === false) {
      this.appointmentService.getAppointmentsByPatient(Number(this.patientTemp.id_user)).subscribe(resp => {
        this.patientAppointments = resp;
      })
    }
    this.clickAppointment = true;
  }

  getAllTeeth() {
    this.toothService.getTeeth(this.patientTemp.id_patient).subscribe(teeth => {
      this.patientTeeth = teeth;
    });
  }

  getAllRecords(filter: 1 | 2) {
    this.recordService.getRecords(this.patientTemp.id_patient, filter).subscribe(records => {
      (filter === 1 ) ? this.patientRecordHome = records :  this.patientRecord = records;
    });
  }

  get getTotalPayment() {
    const totalPayment = this.patientRecordHome
      .filter(r => r.status === StatusRecord.PENDING_PAYMENT)
      .map(r => {
        r.total = r.quantity * r.price
        return r;
      })
      .reduce((acc, record) => acc + Number(record.total), 0);
    return totalPayment;
  }

}
