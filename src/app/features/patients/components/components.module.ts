import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PatientFormComponent } from './patient-form/patient-form.component';
import { CardPatientInfoComponent } from './card-patient-info/card-patient-info.component';
import { TableRecordComponent } from './table-record/table-record.component';
import { ModalServiceComponent } from './modal-service/modal-service.component';
import { OdontogramComponent } from './odontogram/odontogram.component';
import { ModalOdontogramComponent } from './modal-odontogram/modal-odontogram.component';
import { TableOdontogramComponent } from './table-odontogram/table-odontogram.component';
import { TableAppointmentComponent } from './table-appointment/table-appointment.component';
import { ModalsModule } from '@components/modals/modals.module';

@NgModule({
  declarations: [
    PatientFormComponent,
    CardPatientInfoComponent,
    TableRecordComponent,
    ModalServiceComponent,
    OdontogramComponent,
    ModalOdontogramComponent,
    TableOdontogramComponent,
    TableAppointmentComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule
  ],
  exports: [
    PatientFormComponent,
    CardPatientInfoComponent,
    TableRecordComponent,
    ModalServiceComponent,
    OdontogramComponent,
    TableOdontogramComponent,
    TableAppointmentComponent
  ]
})
export class ComponentsModule { }
