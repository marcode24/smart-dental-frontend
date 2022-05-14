import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { User } from '@models/user.model';

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

  constructor() { }

  ngOnInit(): void {
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
