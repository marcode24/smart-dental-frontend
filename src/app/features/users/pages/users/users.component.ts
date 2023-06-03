import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

import { User } from '@models/user.model';

import { ICardIconRight } from '@interfaces/card-icon-right.interface';
import { IOptionsSearch } from '@interfaces/options-search.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public cardsIconData: ICardIconRight[] = [
    {
      title: 'Usuarios',
      quantity: 0,
      icon: 'bxs-group',
      color: 'primary',
      bg: 'scooter'
    },
    {
      title: 'Administradores',
      quantity: 0,
      icon: 'bx-shield-quarter',
      color: 'danger',
      bg: 'bloody'
    },
    {
      title: 'Dentistas',
      quantity: 0,
      icon: 'bxs-user',
      color: 'success',
      bg: 'ohhappiness'
    }
  ];
  public limit = 5;
  private offset = 0;
  private querySearch = '';
  public totalUsers = 0;
  public users: User[];
  public showPagination = true;
  public isLoadingPage = true;
  public isSearching = false;

  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    const optionsSearch: IOptionsSearch = {
      limit: this.limit,
      offset: this.offset,
      fullname: this.querySearch
    };
    this.isSearching = this.querySearch.length > 0;
    this.userService.getUsers(false, optionsSearch).subscribe({
      next: ({ users, totalAdmin, totalUser }) => {
        this.showPagination = (this.querySearch.length > 0) ? false : true;
        this.users = users;
        this.totalUsers = totalAdmin + totalUser;
        this.cardsIconData[0].quantity = this.totalUsers;
        this.cardsIconData[1].quantity = totalAdmin;
        this.cardsIconData[2].quantity = totalUser;
      },
      complete: () => {
        this.isLoadingPage = false;
      }
    });
  }

  get getCurrentUserId() {
    return this.authService.userActive.id_user;
  }

  findByFullname(fullname: string) {
    this.showPagination = false;
    this.querySearch = fullname;
    this.getUsers();
  }

  get getQuerySearchMessage() {
    return `no se encontraron resultados para '${this.querySearch}'`;
  }

  changeLimit(limit: number) {
    this.limit = limit;
    this.offset = 0;
    this.getUsers();
  }

  changePage(value: number) {
    this.offset = value;
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
          next: () => {
            this.getUsers();
          },
          error: () => {
            Swal.fire('Ocurrión un error', 'intentalo de nuevo', 'error');
          }
        });
      }
    });
  }

}
