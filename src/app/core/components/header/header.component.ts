import { Component, OnInit } from '@angular/core';

import { User } from '@models/user.model';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  public userTemp: User;
  constructor(private authService: AuthService) {
    this.userTemp = authService.userActive;
   }

  ngOnInit(): void {
  }

}
