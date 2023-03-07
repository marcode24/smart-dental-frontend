import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';

import { UserService } from '@services/user.service';

import { User } from '@models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {

  public userActive: User;
  public isLoadingPage = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ userId }) => this.findUser(+userId));
  }

  findUser(userId: number) {
    this.userService.getUserByID(userId).subscribe(resp => {
      if(resp.status === 404) {
        return this.router.navigate(['/users']);
      }
      this.userActive = resp.user;
      this.isLoadingPage = false;
    });
  }

  updateUserInfo(valuesChanged: User) {
    this.userService.updateUser(this.userActive.id_user, valuesChanged)
      .subscribe(resp => {
        if(resp === null) {
          return Swal.fire('Ocurrio un error al actualizar los datos', '', 'error');
        }
        localStorage.removeItem('userTemp');
        this.findUser(Number(this.userActive.id_user));
        return Swal.fire('Información actualizada correctamente', '', 'success');
    });
  }

  changeStatus(value: boolean) {
    const userId = this.userActive.id_user?.toString();
    this.userService.changeStatus(userId, value)
      .subscribe(() => this.findUser(Number(this.userActive.id_user)));
  }

}
