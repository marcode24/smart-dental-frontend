import { Component, OnInit } from '@angular/core';

import { Patient } from '@models/patient.model';

import { AuthService } from '@services/auth.service';
import { PatientService } from '@services/patient.service';

import { ICardIconRight } from '@interfaces/card-icon-right.interface';
import { IOptionsSearch } from '@interfaces/options-search.interface';
import { IResponsePatient } from '@interfaces/response.interface';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styles: [
  ]
})
export class PatientsComponent implements OnInit {

  public cardsIconData: ICardIconRight[] = [
    { title: 'Mis Pacientes', quantity: 0, icon: 'bx-user', color: 'info'},
    { title: 'Pacientes activos', quantity: 0, icon: 'bx-check', color: 'success'},
    { title: 'Pacientes inactivos', quantity: 0, icon: 'bx-x', color: 'danger'}
  ]

  private optionsSearch: IOptionsSearch = {
    limit: 5,
    offset: 0,
    fullname: '',
  }

  private allPatients: boolean = false;
  public patients: Patient[];
  public userRole: string;
  public totalPatients: number = 0;
  public showPagination: boolean = true;

  constructor(
    private patientService: PatientService,
    private authService: AuthService,
  ) {
    this.userRole = authService.userActive.role;
  }

  ngOnInit(): void {
    this.getPatients();
  }

  changeOptionGet(event: any) {
    this.allPatients = JSON.parse(event.target.value);
    const patientStr = 'Pacientes';
    this.cardsIconData[0].title = (this.allPatients) ? patientStr: `Mis ${patientStr}`;
    this.getPatients();
  }

  getPatients() {
    if(!this.allPatients) {
      this.patientService.getPatientsByUser(this.optionsSearch, Number(this.authService.userActive.id_user)).subscribe(resp => this.setData(resp));
    } else {
      this.patientService.getPatients(this.optionsSearch).subscribe(resp => this.setData(resp));
    }
  }

  setData(resp: IResponsePatient) {
    const { patients, totalActive, totalInactive } = resp;
    this.showPagination = this.optionsSearch.fullname && this.optionsSearch.fullname.length > 0 ? false : true;
    this.patients = patients;
    this.totalPatients = totalActive + totalInactive;
    this.cardsIconData[0].quantity = this.totalPatients;
    this.cardsIconData[1].quantity = totalActive;
    this.cardsIconData[2].quantity = totalInactive;
  }

  findByFullname(fullname: string) {
    this.showPagination = false;
    this.optionsSearch.fullname = fullname;
    this.getPatients();
  }

  changeLimit(limit: number) {
    this.optionsSearch.limit = limit;
    this.getPatients();
  }

  get getLimitPagination(): number {
    return this.optionsSearch.limit;
  }

  changePage(value: number) {
    this.optionsSearch.offset = value;
    this.getPatients();
  }

}
