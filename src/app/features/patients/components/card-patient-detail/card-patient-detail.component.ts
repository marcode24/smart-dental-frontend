import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Patient } from '@models/patient.model';

@Component({
  selector: 'app-card-patient-detail',
  templateUrl: './card-patient-detail.component.html',
  styles: [
  ]
})
export class CardPatientDetailComponent {

  @Input() patientActive: Patient;
  @Output() newStatus: EventEmitter<boolean> = new EventEmitter();

  get getAddress() {
    const { street, cp, city, country } = this.patientActive;
    const address = `${street}, CP. ${cp} ${city}, ${country}`;
    return address;
  }

  changeStatus(value: boolean) {
    this.newStatus.emit(value);
  }

}
