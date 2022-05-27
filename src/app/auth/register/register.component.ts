import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Roles } from '@enums/role.enum';

import { User } from '@models/user.model';

import { UserService } from '@services/user.service';

import Validation from '@utils/validation';
import ValidationDateBirth from '@utils/validation-date-birth.util';
import { RegexClass } from '@utils/regex.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  private regexExpressions = RegexClass;
  public registerForm = this.fb.group({
    name: ['nombre', [Validators.required, Validators.pattern(this.regexExpressions.ONLY_TEXT)]],
    last_name: ['apellido', [Validators.required, Validators.pattern(this.regexExpressions.ONLY_TEXT)]],
    date_birth: ['2001-09-21', Validators.required],
    gender: ['male', [Validators.required]],
    email: ['ejemplo@gmail.com', [Validators.required, Validators.email, Validators.minLength(10)]],
    phone_number: ['1234567890', [Validators.required, Validators.pattern(this.regexExpressions.PHONE_NUMBER)]],
    street: ['Avenida 1', [Validators.required, Validators.pattern(this.regexExpressions.STREET)]],
    cp: ['12345', [Validators.required, Validators.pattern(this.regexExpressions.CP)]],
    city: ['CDMX', [Validators.required, Validators.pattern(this.regexExpressions.ONLY_TEXT)]],
    country: ['Mexic', [Validators.required, Validators.pattern(this.regexExpressions.ONLY_TEXT)]],
    username: ['', [Validators.required, Validators.pattern(this.regexExpressions.USER_NAME)]],
    password: ['', [Validators.required, Validators.pattern(this.regexExpressions.PASSWORD) ]],
    password2: ['', [Validators.required]],
    },
    {
      validators: [
        Validation.match('password', 'password2'),
        ValidationDateBirth.validate('date_birth'),
      ]
    }
  );

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  setPassword(value: string, field: 'password' | 'password2') {
    this.registerForm.get(field)?.setValue(value);
    this.registerForm.get(field)?.markAsTouched();
    this.registerForm.get(field)?.markAsPristine();
    this.registerForm.get(field)?.markAsDirty();
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
