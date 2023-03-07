import { Component, OnInit } from '@angular/core';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

import { User } from '@models/user.model';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styles: [
  ]
})
export class CodeComponent implements OnInit {

  private userActive: User;
  public isLoadingPage = true;

  constructor(
    private readonly authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userActive = this.authService.userActive;
    this.isLoadingPage = false;
  }

  get getCode(): string | undefined {
    return this.userActive.code;
  }

  changeCode() {
    this.userService.changeCode(this.userActive.id_user).subscribe((resp) => {
      this.userActive.code = resp.newCode;
    });
  }

}
