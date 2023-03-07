import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { Patient } from '@models/patient.model';

import { RegexClass } from '@utils/regex.util';
import ValidationDateBirth from '@utils/validation-date-birth.util';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styles: [
  ]
})
export class PatientFormComponent implements OnInit {
  @Input() patientActive: Patient;
  @Output() patient: EventEmitter<Patient> = new EventEmitter<Patient>();
  @Input() isNew = true;
  private regexExpressions = RegexClass;

  public patientForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.ONLY_TEXT)
    ]],
    last_name: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.ONLY_TEXT)
    ]],
    date_birth: ['', Validators.required],
    gender: ['', [Validators.required]],
    email: ['', [
      Validators.required,
      Validators.email, Validators.minLength(10)
    ]],
    phone_number: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.PHONE_NUMBER)
    ]],
    street: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.STREET)
    ]],
    cp: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.CP)
    ]],
    city: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.ONLY_TEXT)
    ]],
    country: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.ONLY_TEXT)
    ]],
    f_name: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.ONLY_TEXT)
    ]],
    f_last_name: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.ONLY_TEXT)
    ]],
    relationship: ['', Validators.required],
    f_gender: ['', Validators.required],
    f_email: ['', [Validators.required, Validators.email]],
    f_phone_number: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.PHONE_NUMBER)
    ]],
  },{
    validators: [ ValidationDateBirth.validate('date_birth') ]
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    !this.isNew ? this.setValuesToForm(this.patientActive) : '';
  }

  setValuesToForm(values: Patient) {
    this.patientForm.get('name')?.setValue(values.name);
    this.patientForm.get('last_name')?.setValue(values.last_name);
    this.patientForm.get('date_birth')?.setValue(new Date(values.date_birth)
      .toISOString().split('T')[0]);
    this.patientForm.get('gender')?.setValue(values.gender);
    this.patientForm.get('email')?.setValue(values.email);
    this.patientForm.get('phone_number')?.setValue(values.phone_number);
    this.patientForm.get('street')?.setValue(values.street);
    this.patientForm.get('cp')?.setValue(values.cp);
    this.patientForm.get('city')?.setValue(values.city);
    this.patientForm.get('country')?.setValue(values.country);
    this.patientForm.get('f_name')?.setValue(values.familiar.familiar_name);
    this.patientForm.get('f_last_name')?.setValue(values.familiar.familiar_last_name);
    this.patientForm.get('relationship')?.setValue(values.familiar.relationship);
    this.patientForm.get('f_gender')?.setValue(values.familiar.familiar_gender);
    this.patientForm.get('f_email')?.setValue(values.familiar.familiar_email);
    this.patientForm.get('f_phone_number')
      ?.setValue(values.familiar.familiar_phone_number);
  }

  savePatient() {
    if(this.patientForm.valid) {
      const newPatient: Patient = {
        ...this.patientForm.value,
        cp: Number(this.patientForm.get('cp')?.value),
        phone_number: Number(this.patientForm.get('phone_number')?.value),
        familiar: {
          familiar_name: this.patientForm.get('f_name')?.value,
          familiar_last_name: this.patientForm.get('f_last_name')?.value,
          familiar_email: this.patientForm.get('f_email')?.value ,
          familiar_gender: this.patientForm.get('f_gender')?.value ,
          familiar_phone_number: Number(this.patientForm.get('f_phone_number')?.value),
          relationship: this.patientForm.get('relationship')?.value ,
        }
      };
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
