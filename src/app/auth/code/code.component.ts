import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: [ './code.component.css' ]
})
export class CodeComponent {

  public codeForm = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  validateCode() {
    if(this.codeForm.valid) {
      this.authService.validateCode(this.codeForm.get('code')?.value)
        .subscribe((valid: boolean) => {
          if(!valid) {
            return Swal
              .fire('Código inválido', 'Verifique si esta bien escrito', 'error');
          }
          this.router.navigate(['/register']);
      });
    }
  }

  validateForm(field: string): boolean | undefined | null {
    const myForm = this.codeForm.get(field);
    return (myForm?.errors && (myForm?.dirty || myForm?.touched));
  }

  validateField(field: string, error: string): boolean | undefined | null {
    return (this.codeForm.get(field)?.hasError(error));
  }

  changeInputValidation(field: string, error: string): string {
    return this.validateForm(field)
      ? 'is-invalid'
      : (this.validateField(field,error))
        ? ''
        : 'is-valid';
  }

  changeLabelColor(field: string, error: string): string {
    return this.validateForm(field)
    ? 'text-danger'
    : (this.validateField(field,error))
      ? ''
      : 'text-success';
  }

  backToLogin() {
    this.router.navigate(['/login']);
  }

}
