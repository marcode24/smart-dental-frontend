import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { UserService } from '@services/user.service';

import { Patient } from '@models/patient.model';
import { User } from '@models/user.model';

@Component({
  selector: 'app-card-user-detail',
  templateUrl: './card-user-detail.component.html',
  styles: [
  ]
})
export class CardUserDetailComponent implements OnInit {
  @Input() patientActive: Patient;

  @Output() userChanged: EventEmitter<number> = new EventEmitter();
  public changeUser: boolean = false;
  public userIdSelected: number | undefined;
  public userSelected: User;
  public usersActive: User[];

  constructor(private readonly userService: UserService) { }

  ngOnInit(): void {
    console.log(this.patientActive);
  }

  getUsers() {
    this.changeUser = true;
    this.userIdSelected = this.patientActive.user?.id_user;
    this.userService.getUsers(true).subscribe(({ users }) => this.usersActive = users);
  }

  selectUser(event: any) {
    this.userIdSelected = Number(event.value);
    this.userSelected = this.usersActive.find(user => user.id_user === this.userIdSelected) as User;
  }

  saveChanges() {
    this.changeUser = false;
    this.userChanged.emit(this.userIdSelected);
  }

}
