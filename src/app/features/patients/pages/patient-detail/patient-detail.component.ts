import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Patient } from '@models/patient.model';

import { PatientService } from '@services/patient.service';

@Component({
  selector: 'app-patient-detail',
  templateUrl: './patient-detail.component.html',
  styles: [
  ]
})
export class PatientDetailComponent implements OnInit, OnDestroy {

  public patientTemp: Patient;
  private patientSub: Subscription;

  constructor(private patientService: PatientService) { }

  ngOnDestroy(): void {
    this.patientSub.unsubscribe();
  }

  ngOnInit(): void {
    this.patientTemp = this.patientService.patientTemp;
    this.patientSub = this.patientService.patientTempChanged.subscribe(patient => this.patientTemp = patient );
  }

  updatePatientInfo(changes: Patient) {
    const patientID: number = Number(this.patientTemp.id_patient);
    const familiarID: number = Number(this.patientTemp.id_familiar);
    this.patientService.updateInfo(patientID, familiarID, changes);
  }

  getPatient() {
    this.patientService.getPatientByUser(Number(this.patientTemp.id_patient), true).subscribe();
  }

  changeStatus(status: boolean) {
    this.patientService.changeStatus(Number(this.patientTemp.id_patient), status).subscribe(() => this.getPatient());
  }

  changeUser(userId: number) {
    this.patientService.changeUser(Number(this.patientTemp.id_patient), userId).subscribe(resp => {
      if(resp[0] === 0) {
        Swal.fire('Ocurrio un error al cambiar usuario', '', 'error');
      } else {
        this.getPatient();
      }
    });
  }
}
