import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '@models/user.model';

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
  private generalInfo: User;
  public generalInfoForm: FormGroup = this.fb.group({
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
  });

  constructor(
    private fb: FormBuilder,
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
    this.setValuesToForm(user);
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

}
