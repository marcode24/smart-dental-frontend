import { Component } from '@angular/core';

import { AuthService } from '@services/auth.service';

import { User } from '@models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public userTemp: User;
  constructor(private authService: AuthService) {
    this.userTemp = authService.userActive;
   }

  logout() {
    this.authService.logout();
  }

  get getFullname() : string {
    return `${this.userTemp.name} ${this.userTemp.last_name}`;
  }

  get hasAccess(): boolean {
    return this.userTemp.role === 'ADMIN';
  }

}
