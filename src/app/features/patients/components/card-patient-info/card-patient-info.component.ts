import { Component, Input } from '@angular/core';

import { Patient } from '@models/patient.model';

@Component({
  selector: 'app-card-patient-info',
  templateUrl: './card-patient-info.component.html',
  styles: [
  ]
})
export class CardPatientInfoComponent {

  @Input() patient: Patient;

  get getAddress() {
    const { street, cp, city, country } = this.patient;
    const address = `${street}, CP. ${cp} ${city}, ${country}`;
    return address;
  }

}
