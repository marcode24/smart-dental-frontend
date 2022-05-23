import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAccountInfo } from '@interfaces/user.interface';
import { RegexClass } from '@utils/regex.util';
import Validation from '@utils/validation';

@Component({
  selector: 'app-form-account',
  templateUrl: './form-account.component.html',
  styles: [
  ]
})
export class FormAccountComponent implements OnInit {

  @Input() imageUserTemp: string;
  @Output() showGeneralInfo: EventEmitter<boolean> = new EventEmitter();
  @Output() accountInfo: EventEmitter<IAccountInfo> = new EventEmitter();
  private regexExpressions = RegexClass;
  public accountForm: FormGroup;
  public bgColorImageUser: string = 'primary';

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  backToGeneralInfo() {
    this.showGeneralInfo.emit(true);
    this.bgColorImageUser = 'primary'
  }

  createAccount() {
    if(this.accountForm.valid) {
      this.accountInfo.emit(this.accountForm.value);
    }
  }

  loadForm() {
    this.accountForm = this.fb.group({
      role: ['DENTIST', [Validators.required]],
      username: ['', [Validators.required, Validators.pattern(this.regexExpressions.USER_NAME)]],
      password: ['', [Validators.required, Validators.pattern(this.regexExpressions.PASSWORD)]],
      password2: ['', [Validators.required]],
    },
    {
      validators: [Validation.match('password', 'password2')]
    })
  }

  changeBgColorImage(event: any) {
    const value = event.target.value;
    this.bgColorImageUser = (value === 'ADMIN') ? 'danger' : 'primary';
  }


  validateAccountForm(field: string): boolean | undefined | null {
    const myForm = this.accountForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateAccountField(field: string, error: string): boolean | undefined | null {
    return (this.accountForm.get(field)?.hasError(error));
  }

}
