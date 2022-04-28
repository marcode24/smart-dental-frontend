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
  public patientRecords: Record[];

  private newRecord: Subscription;

  constructor(
    private patientService: PatientService,
    private recordService: RecordService,
    private serviceOfferService: ServiceOfferService
  ) {
    this.patientTemp = this.patientService.patientTemp;
  }

  ngOnDestroy(): void {
    this.newRecord.unsubscribe();
  }

  ngOnInit(): void {
    this.getRecords();
    this.newRecord = this.recordService.newRecord.subscribe(resp => (resp) ? this.getRecords(): '');
  }

  getRecords() {
    this.recordService.getRecords(this.patientTemp.id_patient, 1).subscribe(records => {
      this.patientRecords = records;
      console.log(this.patientRecords);
    });
  }

  getServicesActive() {
    this.serviceOfferService.getServicesActive(false);
  }

  get getTotalPayment() {
    const totalPayment = this.patientRecords
      .filter(r => r.status === StatusRecord.PENDING_PAYMENT)
      .map(r => {
        r.total = r.quantity * r.price
        return r;
      })
      .reduce((acc, record) => acc + Number(record.total), 0);
    return totalPayment;
  }

}
