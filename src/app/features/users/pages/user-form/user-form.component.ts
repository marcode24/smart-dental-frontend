import { Component, OnInit } from '@angular/core';

import { UserService } from '@services/user.service';

import { User } from '@models/user.model';

import { Gender } from '@enums/gender.enum';
import { IAccountInfo } from '@interfaces/user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent implements OnInit {

  public showAccountForm: boolean = false;

  public imageUser: string;

  private newUser: User;

  constructor(
    private readonly userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  loadAccountForm(userInfo: User) {
    this.newUser = { ...userInfo };
    const genderSelected = this.newUser.gender || 'other';
    this.imageUser = (genderSelected === 'female') ? Gender.FEMALE : (genderSelected === 'male') ? Gender.MALE : Gender.OTHER;
    this.showAccountForm = true;
  }

  showGeneralInfo() {
    this.showAccountForm = false;
  }

  createAccount(accountInfo: IAccountInfo) {
    this.newUser = {
      ...this.newUser,
      ...accountInfo
    };
    this.userService.createUser(this.newUser).subscribe();
  }

}
