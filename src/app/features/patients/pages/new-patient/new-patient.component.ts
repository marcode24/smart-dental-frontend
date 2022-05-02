import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { PatientService } from '@services/patient.service';

import { Patient } from '@models/patient.model';

@Component({
  selector: 'app-new-patient',
  templateUrl: './new-patient.component.html',
  styles: [
  ]
})
export class NewPatientComponent implements OnInit {

  constructor(
    private readonly patientService: PatientService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  createPatient(patient: Patient) {
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
