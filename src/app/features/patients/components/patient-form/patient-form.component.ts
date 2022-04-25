import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '@services/auth.service';

import { Patient } from '@models/patient.model';

import { GenderPatient } from '@enums/gender.enum';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styles: [
  ]
})
export class PatientFormComponent implements OnInit {

  @Output() patient: EventEmitter<Patient> = new EventEmitter<Patient>();

  public patientForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    last_name: ['', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    date_birth: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
    gender: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
    phone_number: ['', [Validators.required, Validators.maxLength(12)]],
    street: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    cp: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
    city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    country: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    f_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    f_last_name: ['', [Validators.required, Validators.minLength(2),Validators.maxLength(20)]],
    relationship: ['', Validators.required],
    f_gender: ['', Validators.required],
    f_email: ['', [Validators.required, Validators.email, Validators.minLength(10)]],
    f_phone_number: ['', [Validators.required, Validators.maxLength(12)]],
  });

  constructor(
    private fb: FormBuilder,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  savePatient() {
    if(this.patientForm.valid) {
      const genderSelected = this.patientForm.get('gender')?.value;
      const newPatient: Patient = {
        ...this.patientForm.value,
        id_user: this.authService.userActive.id_user,
        cp: Number(this.patientForm.get('cp')?.value),
        phone_number: Number(this.patientForm.get('phone_number')?.value),
        image: (genderSelected === 'female') ? GenderPatient.FEMALE : (genderSelected === 'male') ? GenderPatient.MALE : GenderPatient.OTHER,
        familiar: {
          familiar_name: this.patientForm.get('f_name')?.value,
          familiar_last_name: this.patientForm.get('f_last_name')?.value,
          familiar_email: this.patientForm.get('f_email')?.value ,
          familiar_gender: this.patientForm.get('f_gender')?.value ,
          familiar_phone_number: Number(this.patientForm.get('f_phone_number')?.value),
          relationship: this.patientForm.get('relationship')?.value ,
        }
      }
      this.patient.emit(newPatient);
    }
  }

  validateForm(field: string): boolean | undefined | null {
    const myForm = this.patientForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateField(field: string, error: string): boolean | undefined | null {
    return (this.patientForm.get(field)?.hasError(error));
  }


}
