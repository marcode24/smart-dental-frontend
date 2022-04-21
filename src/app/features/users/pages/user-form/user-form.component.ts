import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from '@services/user.service';

import { User } from '@models/user.model';

import Validation from '@utils/validation';

import { Gender } from '@enums/gender.enum';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent implements OnInit {

  public showAccountForm: boolean = false;

  public imageUser: string;
  public bgColorImageUser: string = 'primary';

  public registerForm = this.fb.group({
    name: ['ejemplo '+(Math.random()*1000).toFixed(), [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    last_name: ['apellido', [Validators.required,Validators.minLength(2),Validators.maxLength(20)]],
    date_birth: ['2021-02-24', [Validators.required,Validators.minLength(5),Validators.maxLength(20)]],
    gender: ['male', [Validators.required]],
    email: ['ejemplo1@gmail.com', [Validators.required, Validators.email, Validators.minLength(10)]],
    phone_number: ['131312312', [Validators.required, Validators.maxLength(12)]],
    street: ['avenida 1', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    cp: ['12345', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
    city: ['CDMX', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    country: ['Mexico', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
  });

  public accountForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    if(this.registerForm.valid) {
      const newUser: User = {
        ...this.registerForm.value,
        cp: Number(this.registerForm.get('cp')?.value),
        phone_number: Number(this.registerForm.get('phone_number')?.value),
        ...this.accountForm.value
      };
      const roleSelected = this.accountForm.get('role')?.value;
      this.userService.createUser(newUser, roleSelected).subscribe();
    }
  }

  loadAccountForm() {
    const genderSelected = this.registerForm.get('gender')?.value || 'other';
    this.imageUser = (genderSelected === 'female') ? Gender.FEMALE : (genderSelected === 'male') ? Gender.MALE : Gender.OTHER;
    this.showAccountForm = true;
    this.accountForm = this.fb.group({
      role: ['DENTIST', [Validators.required]],
      username: ['usuario '+(Math.random()*1000).toFixed(), [Validators.required, Validators.minLength(5), Validators.maxLength(24)]],
      password: ['123456', [Validators.required, Validators.minLength(5)]],
      password2: ['123456', [Validators.required]],
    },
    {
      validators: [Validation.match('password', 'password2')]
    })
  }

  changeBgColorImage(event: any) {
    const value = event.target.value;
    this.bgColorImageUser = (value === 'ADMIN') ? 'danger' : 'primary';
  }

  validateForm(field: string): boolean | undefined | null {
    const myForm = this.registerForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateField(field: string, error: string): boolean | undefined | null {
    return (this.registerForm.get(field)?.hasError(error));
  }

  validateAccountForm(field: string): boolean | undefined | null {
    const myForm = this.accountForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateAccountField(field: string, error: string): boolean | undefined | null {
    return (this.accountForm.get(field)?.hasError(error));
  }

}
