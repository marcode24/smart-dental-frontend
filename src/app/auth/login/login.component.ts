import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: () => {
          console.log('entro en next');
          this.router.navigate(['/']);
        },
        error: () => {
          console.log('se fue a swal');
          Swal.fire('Usuario y/o password incorrectos', '', 'error');
        }
      })
    }
  }

}
