import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '@models/user.model';

import { UserService } from '@services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styles: [
  ]
})
export class UserDetailComponent implements OnInit {

  public userActive: User;

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
    });
  }

  updateUserInfo(valuesChanged: User) {
    this.userService.updateUser(this.userActive.id_user, valuesChanged).subscribe(resp => {
      if(resp[0] === 0) {
        return Swal.fire('Ocurrio un error al actualizar los datos', '', 'error');
      }
      if(resp[0] === 1) {
        this.findUser(Number(this.userActive.id_user));
        return Swal.fire('Información actualizada correctamente', '', 'success');
      }
    })
  }

  changeStatus(value: boolean) {
    const userId = this.userActive.id_user?.toString();
    this.userService.changeStatus(userId, value).subscribe(() => this.findUser(Number(this.userActive.id_user)));
  }

}
