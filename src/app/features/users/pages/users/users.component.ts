import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { ICardIconRight } from '@interfaces/card-icon-right.interface';

import { User } from '@models/user.model';

import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';

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
  private findUserByName: string = '';

  public users: User[];

  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers(this.limit, this.offset, this.findUserByName).subscribe(({ users, totalAdmin, totalUser }) => {
      this.users = users;
      this.cardsIconData[0].quantity = totalAdmin + totalUser;
      this.cardsIconData[1].quantity = totalAdmin;
      this.cardsIconData[2].quantity = totalUser;
    })
  }

  findByFullname(fullname: string) {
    this.findUserByName = fullname;
    this.getUsers();
  }

  changeLimit(limit: number) {
    this.limit = limit;
    this.getUsers();
  }


  changeStatus(fullname:string, idUser: number | undefined) {
    if(idUser === this.authService.userActive.id_user) {
      return;
    }
    Swal.fire({
      title: `¿Estás seguro de suspender a '${fullname}'?`,
      text: "No podrás revertir este cambio",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, suspender'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.changeStatus(idUser?.toString(), false).subscribe({
          next:() => {
            this.getUsers();
          },
          error: (e) => {
            Swal.fire('Ocurrión un error', 'intentalo de nuevo', 'error');
          }
        })
      }
    })
  }

}
