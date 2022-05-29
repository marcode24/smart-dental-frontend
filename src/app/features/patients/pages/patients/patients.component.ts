import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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
    { title: 'Mis Pacientes', quantity: 0, icon: 'bxs-user', color: 'primary', bg: 'scooter'},
    { title: 'Pacientes activos', quantity: 0, icon: 'bx-check', color: 'success', bg: 'ohhappiness'},
    { title: 'Pacientes inactivos', quantity: 0, icon: 'bx-block', color: 'danger', bg: 'bloody'}
  ]
  private optionsSearch: IOptionsSearch = { limit: 5, offset: 0, fullname: '' };
  public patients: Patient[];
  public userRole: string;
  public totalPatients: number = 0;
  public showPagination: boolean = true;
  public findingByFullname: boolean = false;
  private allPatients: boolean = false;
  public isLoadingPage: boolean = true;

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
    this.findingByFullname = false;
    this.optionsSearch.fullname = '';
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
    this.isLoadingPage = false;
  }

  findByFullname(fullname: string) {
    this.findingByFullname = true;
    if(fullname.trim().length === 0) {
      this.findingByFullname = false;
    }
    this.showPagination = false;
    this.optionsSearch.fullname = fullname;
    this.getPatients();
  }

  changeLimit(limit: number) {
    this.optionsSearch.limit = limit;
    this.optionsSearch.offset = 0;
    this.getPatients();
  }

  get getLimitPagination(): number {
    return this.optionsSearch.limit;
  }

  changePage(value: number) {
    this.optionsSearch.offset = value;
    this.getPatients();
  }

  changeStatus(fullname:string, idPatient: number | undefined) {
    Swal.fire({
      title: `¿Estás seguro de suspender a '${fullname}'?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, suspender'
    }).then((result) => {
      if (result.isConfirmed) {
        this.patientService.changeStatus(Number(idPatient), false).subscribe({
          next: () => {
            this.getPatients();
          },
          error: (e) => {
            Swal.fire('Ocurrió un error', 'intentalo de nuevo', 'error');
          }
        })
      }
    })
  }

  get showOptions(): boolean {
    return (this.patients && this.patients.length > 0) || this.findingByFullname;
  }

  get showColumn(): boolean {
    return this.authService.userActive.role === 'ADMIN' && this.allPatients;
  }

}
