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
  public generalInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(){
    this.generalInfoForm = this.fb.group({
      name: [this.userActive.name || '', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      last_name: [this.userActive.last_name || '', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
      date_birth: [new Date(this.userActive.date_birth).toISOString().split('T')[0] || '', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
      gender: [this.userActive.gender || '', [Validators.required]],
      email: [this.userActive.email || '', [Validators.required, Validators.email, Validators.minLength(10)]],
      phone_number: [this.userActive.phone_number || '', [Validators.required, Validators.maxLength(12)]],
      street: [this.userActive.street || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      cp: [this.userActive.cp || '', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      city: [this.userActive.city || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      country: [this.userActive.country || '', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    });
  }

  saveUserInfo() {
    const generalInfo: User = {
      ...this.generalInfoForm.value,
      cp: Number(this.generalInfoForm.get('cp')?.value),
      phone_number: Number(this.generalInfoForm.get('phone_number')?.value),
    };
    this.userInfo.emit(generalInfo);
  }

  validateForm(field: string): boolean | undefined | null {
    const myForm = this.generalInfoForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateField(field: string, error: string): boolean | undefined | null {
    return (this.generalInfoForm.get(field)?.hasError(error));
  }

}
