import { Component } from '@angular/core';

import Swal from 'sweetalert2';

import { AuthService } from '@services/auth.service';
import { UserService } from '@services/user.service';

import { User } from '@models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent {
  public userActive: User;

  constructor(
    private readonly authService: AuthService,
    private userService: UserService
  ) {
    this.userActive = this.authService.userActive;
  }

  updateUserInfo(valuesChanged: User) {
    this.userService.updateUser(this.userActive.id_user, valuesChanged)
      .subscribe(resp => {
        if(resp === null) {
          return Swal.fire('Ocurrio un error al actualizar los datos', '', 'error');
        }
        localStorage.removeItem('userTemp');
        this.userService.getUserByID(Number(this.userActive.id_user)).subscribe({
          next: ({user}) => this.userActive = user,
          complete: () => Swal
            .fire('Información actualizada correctamente', '', 'success')
        });
    });
  }

}
