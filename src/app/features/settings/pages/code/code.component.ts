import { Component, OnInit } from '@angular/core';

import { User } from '@models/user.model';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styles: [
  ]
})
export class CodeComponent implements OnInit {

  private userActive: User;
  public isLoadingPage: boolean = true;

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
