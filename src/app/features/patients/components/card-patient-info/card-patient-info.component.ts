import { Component, Input, OnInit } from '@angular/core';

import { Patient } from '@models/patient.model';

@Component({
  selector: 'app-card-patient-info',
  templateUrl: './card-patient-info.component.html',
  styles: [
  ]
})
export class CardPatientInfoComponent implements OnInit {

  @Input() patient: Patient;

  constructor() { }

  ngOnInit(): void {
  }

  get getAddress() {
    const { street, cp, city, country } = this.patient;
    const address = `${street}, CP. ${cp} ${city}, ${country}`;
    return address;
  }

}
