import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '@models/user.model';

import { RegexClass } from '@utils/regex.util';
import ValidationDateBirth from '@utils/validation-date-birth.util';

@Component({
  selector: 'app-form-general-info',
  templateUrl: './form-general-info.component.html',
  styles: [
  ]
})
export class FormGeneralInfoComponent implements OnInit {
  @Input() userActive: User;
  @Output() userInfo: EventEmitter<User> = new EventEmitter();
  @Input() isNew: boolean = true;
  private regexExpressions = RegexClass;
  private generalInfo: User;
  public generalInfoForm: FormGroup = this.fb.group({
    name: ['ejemplo', [Validators.required, Validators.pattern(this.regexExpressions.ONLY_TEXT)]],
    last_name: ['ejemplo', [Validators.required, Validators.pattern(this.regexExpressions.ONLY_TEXT)]],
    date_birth: ['2001-04-23', Validators.required],
    gender: ['female', [Validators.required]],
    email: ['ejemplo@gmail.com', [Validators.required, Validators.email, Validators.minLength(10)]],
    phone_number: ['1234567890', [Validators.required, Validators.pattern(this.regexExpressions.PHONE_NUMBER)]],
    street: ['avenida 1', [Validators.required, Validators.pattern(this.regexExpressions.STREET)]],
    cp: ['12432', [Validators.required, Validators.pattern(this.regexExpressions.CP)]],
    city: ['CDMX', [Validators.required, Validators.pattern(this.regexExpressions.ONLY_TEXT)]],
    country: ['Mexico', [Validators.required, Validators.pattern(this.regexExpressions.ONLY_TEXT)]],
  }, {
    validators: [
      ValidationDateBirth.validate('date_birth'),
    ]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this.isNew ? this.setInfoUserTemp() : this.setInfoUserActive();
  }

  setValuesToForm(values: User) {
    this.generalInfoForm.get('name')?.setValue(values.name);
    this.generalInfoForm.get('last_name')?.setValue(values.last_name);
    this.generalInfoForm.get('date_birth')?.setValue((this.isNew) ? values.date_birth : new Date(values.date_birth).toISOString().split('T')[0]);
    this.generalInfoForm.get('gender')?.setValue(values.gender);
    this.generalInfoForm.get('email')?.setValue(values.email);
    this.generalInfoForm.get('phone_number')?.setValue(values.phone_number);
    this.generalInfoForm.get('street')?.setValue(values.street);
    this.generalInfoForm.get('cp')?.setValue(values.cp);
    this.generalInfoForm.get('city')?.setValue(values.city);
    this.generalInfoForm.get('country')?.setValue(values.country);
  }

  setInfoUserActive() {
    this.setValuesToForm(this.userActive);
  }

  setInfoUserTemp() {
    const data: any = localStorage.getItem('userTemp');
    const user: User = JSON.parse(data);
    if(!user){
      this.generalInfoForm.reset();
      this.generalInfoForm.get('gender')?.setValue('');
    } else {
      this.setValuesToForm(user);
    }
  }

  saveUserInfo() {
    if(this.generalInfoForm.valid) {
      this.generalInfo = {
        ...this.generalInfoForm.value,
        cp: Number(this.generalInfoForm.get('cp')?.value),
        phone_number: Number(this.generalInfoForm.get('phone_number')?.value),
      };
      localStorage.setItem('userTemp', JSON.stringify(this.generalInfo));
      this.userInfo.emit(this.generalInfo);
    }
  }

  validateForm(field: string): boolean | undefined | null {
    const myForm = this.generalInfoForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateField(field: string, error: string): boolean | undefined | null {
    return (this.generalInfoForm.get(field)?.hasError(error));
  }

  cancelCreateUser() {
    localStorage.removeItem('userTemp');
    this.router.navigate(['/users']);
  }

}
