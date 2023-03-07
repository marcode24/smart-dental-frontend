import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public saveUser = false;
  private passwordTemp = '';
  public isLoadingPage = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadLoginForm();
  }

  loadLoginForm() {
    let data: any = localStorage.getItem('user') || null;
    data = data && JSON.parse(data);
    this.saveUser = (data) ? true: false;
    this.passwordTemp = (data && data.password) ? data.password: '';
    this.loginForm = this.fb.group({
      username: [data?.username || '', Validators.required],
      password: [data?.password || '', Validators.required]
    });
    this.isLoadingPage = false;
  }

  saveUserInfo(event: any) {
    const value = event.checked;
    this.saveUser = value;
  }

  setPassword(value: string) {
    this.loginForm.get('password')?.setValue(value);
  }

  get getPasswordTemp(): string {
    return this.passwordTemp;
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
          if(!this.saveUser) {
            localStorage.removeItem('user');
          } else {
            localStorage.setItem('user', JSON.stringify(this.loginForm.value));
          }
        },
        error: (e: any) => {
          const error = e.error;
          const message = error?.message;
          if(message === 'User disabled') {
            Swal.fire(
              'Usuario deshabilitado',
              'pidele ayuda a tu administrador',
              'warning'
            );
          } else if(message === 'User or password are incorrect') {
            Swal.fire(
              'Usuario y/o password incorrectos',
              '',
              'error'
            );
          } else {
            Swal.fire(
              'Ocurrio un error',
              'Intentalo de nuevo',
              'warning'
            );
          }
        }
      });
    }
  }

}
