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
  public saveUser: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.loadLoginForm();
  }

  loadLoginForm(){
    let data: any = localStorage.getItem('user') || null;
    data = data && JSON.parse(data);
    this.saveUser = (data) ? true: false;
    console.log(this.saveUser);
    this.loginForm = this.fb.group({
      username: [data?.username || '', Validators.required],
      password: [data?.password || '', Validators.required]
    })
  }

  saveUserInfo(event: any) {
    const value = event.checked;
    this.saveUser = value;
    console.log(this.saveUser);
  }

  login() {
    if(this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          console.log('entra a home', this.saveUser);
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
            Swal.fire('Usuario deshabilitado', 'Pide ayuda a tu administrador', 'error');
          } else if(message === 'User or password are incorrect') {
            Swal.fire('Usuario y/o password incorrectos', '', 'error');
          } else {
            Swal.fire('Ocurrio un error', 'Intentalo de nuevo', 'warning');
          }
        }
      })
    }
  }

}
