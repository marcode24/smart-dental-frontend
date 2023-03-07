import { Component } from '@angular/core';

import { UserService } from '@services/user.service';

import { User } from '@models/user.model';

import { IAccountInfo } from '@interfaces/user.interface';

import { Gender } from '@enums/gender.enum';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [
  ]
})
export class UserFormComponent {

  public showAccountForm = false;
  public imageUser: string;
  private newUser: User;

  constructor(
    private readonly userService: UserService,
  ) { }

  loadAccountForm(userInfo: User) {
    this.newUser = { ...userInfo };
    const genderSelected = this.newUser.gender || 'other';
    this.imageUser = (genderSelected === 'female')
      ? Gender.FEMALE
      : (genderSelected === 'male')
        ? Gender.MALE
        : Gender.OTHER;
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
