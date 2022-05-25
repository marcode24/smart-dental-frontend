import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalsModule } from '@components/modals/modals.module';

import { CardPatientInfoComponent } from './card-patient-info/card-patient-info.component';
import { CardPatientDetailComponent } from './card-patient-detail/card-patient-detail.component';
import { CardUserDetailComponent } from './card-user-detail/card-user-detail.component';
import { ModalServiceComponent } from './modal-service/modal-service.component';
import { ModalOdontogramComponent } from './modal-odontogram/modal-odontogram.component';
import { OdontogramComponent } from './odontogram/odontogram.component';
import { PatientFormComponent } from './patient-form/patient-form.component';
import { TableAppointmentComponent } from './table-appointment/table-appointment.component';
import { TableOdontogramComponent } from './table-odontogram/table-odontogram.component';
import { TableRecordComponent } from './table-record/table-record.component';

@NgModule({
  declarations: [
    PatientFormComponent,
    CardPatientInfoComponent,
    TableRecordComponent,
    ModalServiceComponent,
    OdontogramComponent,
    ModalOdontogramComponent,
    TableOdontogramComponent,
    TableAppointmentComponent,
    CardPatientDetailComponent,
    CardUserDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalsModule,
    RouterModule
  ],
  exports: [
    PatientFormComponent,
    CardPatientInfoComponent,
    TableRecordComponent,
    ModalServiceComponent,
    OdontogramComponent,
    TableOdontogramComponent,
    TableAppointmentComponent,
    CardPatientDetailComponent,
    CardUserDetailComponent

  ]
})
export class ComponentsModule { }
