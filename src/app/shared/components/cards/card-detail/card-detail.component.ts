import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from '@models/user.model';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.component.html',
  styles: [
  ]
})
export class CardDetailComponent implements OnInit {

  @Input() userActive: User;
  @Input() detail: boolean = true;
  @Output() newStatus: EventEmitter<boolean> = new EventEmitter();

  public isSettings: boolean = false;

  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.isSettings = this.userActive.id_user === this.authService.userActive.id_user;
  }

  get getAddress() {
    const { street, cp, city, country } = this.userActive;
    const address = `${street}, CP. ${cp} ${city}, ${country}`;
    return address;
  }

  changeStatus(value: boolean) {
    this.newStatus.emit(value);
  }

}
