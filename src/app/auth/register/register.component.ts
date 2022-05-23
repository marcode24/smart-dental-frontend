import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Roles } from '@enums/role.enum';

import { User } from '@models/user.model';

import { UserService } from '@services/user.service';

import Validation from '@utils/validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  public registerForm = this.fb.group({
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
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(24)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [Validation.match('password', 'password2')]
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  register() {
    if(this.registerForm.valid) {
      const newUser: User = {
        ...this.registerForm.value,
        cp: Number(this.registerForm.get('cp')?.value),
        phone_number: Number(this.registerForm.get('phone_number')?.value),
        role: Roles.DENTIST
      };
      this.userService.createUser(newUser, true).subscribe();
    }
  }

  validateForm(field: string): boolean | undefined | null {
    const myForm = this.registerForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateField(field: string, error: string): boolean | undefined | null {
    return (this.registerForm.get(field)?.hasError(error));
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

}
