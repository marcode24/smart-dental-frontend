import { Component, OnInit } from '@angular/core';

import { ICardIconRight } from '@interfaces/card-icon-right.interface';

import { User } from '@models/user.model';

import { UserService } from '@services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public cardsIconData: ICardIconRight[] = [
    { title: 'Usuarios', quantity: 0, icon: 'bx-group', color: 'success'},
    { title: 'Administradores', quantity: 0, icon: 'bx-shield-quarter', color: 'danger'},
    { title: 'Dentistas', quantity: 0, icon: 'bx-user', color: 'info'}
  ]

  private limit: number = 5;
  private offset: number = 0;
  private findUser: string = '';

  public users: User[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.limit, this.offset, this.findUser).subscribe(({ users, totalAdmin, totalUser }) => {
      this.users = users;
      this.cardsIconData[0].quantity = totalAdmin + totalUser;
      this.cardsIconData[1].quantity = totalAdmin;
      this.cardsIconData[2].quantity = totalUser;
    })
  }

}
