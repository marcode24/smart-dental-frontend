import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientFormComponent } from './patient-form/patient-form.component';
import { CardPatientInfoComponent } from './card-patient-info/card-patient-info.component';
import { TableRecordComponent } from './table-record/table-record.component';
import { ModalServiceComponent } from './modal-service/modal-service.component';

@NgModule({
  declarations: [
    PatientFormComponent,
    CardPatientInfoComponent,
    TableRecordComponent,
    ModalServiceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PatientFormComponent,
    CardPatientInfoComponent,
    TableRecordComponent,
    ModalServiceComponent
  ]
})
export class ComponentsModule { }
