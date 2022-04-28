import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { StatusRecord } from '@enums/status-record.enum';

import { Patient } from '@models/patient.model';
import { Record } from '@models/record.model';

import { PatientService } from '@services/patient.service';
import { RecordService } from '@services/record.service';
import { ServiceOfferService } from '@services/service-offer.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styles: [
  ]
})
export class RecordComponent implements OnInit, OnDestroy {

  public up: Array<number> = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  public down: Array<number> = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  public patientTemp: Patient;
  public patientRecordHome: Record[];
  public patientRecord: Record[];
  private clickRecord: boolean = false;

  private recordsHome: Subscription;
  private records: Subscription;

  constructor(
    private patientService: PatientService,
    private recordService: RecordService,
    private serviceOfferService: ServiceOfferService
  ) {
    this.patientTemp = this.patientService.patientTemp;
  }

  ngOnDestroy(): void {
    this.recordsHome.unsubscribe();
    this.records.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllRecords(1);
    this.recordsHome = this.recordService.changedRecordsHome.subscribe(resp => (resp) ? this.getAllRecords(1): '');
    this.records = this.recordService.changedRecords.subscribe(resp => (resp) ? this.getAllRecords(2) : '');
  }

  getServicesActive() {
    this.serviceOfferService.getServicesActive(false);
  }

  // click tab record
  getRecords() {
    if(this.clickRecord === false) {
      console.log('click en records tab');
      this.getAllRecords(2);
    }
    this.clickRecord = true;
  }

  getAllRecords(filter: 1 | 2) {
    this.recordService.getRecords(this.patientTemp.id_patient, filter).subscribe(records => {
      (filter === 1 ) ? this.patientRecordHome = records :  this.patientRecord = records;
      console.log(records, {filter});
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
