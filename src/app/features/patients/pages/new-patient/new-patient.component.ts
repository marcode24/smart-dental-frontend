import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '@services/auth.service';
import { PatientService } from '@services/patient.service';

import { Patient } from '@models/patient.model';

import { GenderPatient } from '@enums/gender.enum';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styles: [
  ]
})
export class NewPatientComponent implements OnInit {

  constructor(
    private readonly patientService: PatientService,
    private readonly authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createPatient(patient: Patient) {
    const genderSelected = patient.gender;
    patient = {
      ...patient,
      id_user: this.authService.userActive.id_user,
      image: (genderSelected === 'female') ? GenderPatient.FEMALE : (genderSelected === 'male') ? GenderPatient.MALE : GenderPatient.OTHER,
    }
    this.patientService.createPatient(patient).subscribe({
      next: () => {
        this.router.navigate(['/patients']);
        Swal.fire('Paciente creado correctamente', '', 'success');
      },
      error: (err) => {
        Swal.fire('Ocurrió un error al crear paciente', 'intentelo de nuevo', 'error');
      }
    })
  }

}
