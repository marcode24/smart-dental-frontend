import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Patient } from '@models/patient.model';
import { Record } from '@models/record.model';

import { PatientService } from '@services/patient.service';
import { RecordService } from '@services/record.service';
import { ICreateAppointment } from '@interfaces/appointment.interface';
import ValidationDate from '@utils/validation-date.util';
import ValidationTime from '@utils/validation-time.util';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styles: [
  ]
})
export class AppointmentFormComponent implements OnInit {

  @Output() dateSelected: EventEmitter<string> = new EventEmitter();
  @Output() newAppointment: EventEmitter<ICreateAppointment> = new EventEmitter();

  public appointmentForm: FormGroup;
  public patientTemp: Patient;
  public recordsPatient: Record[];
  private id_records: number[] = [];

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private readonly recordService: RecordService,
  ) { }

  ngOnInit(): void {
  }

  findPatient(value: string) {
    if(value.trim().length === 0){
      return;
    }
    const patientId = Number(value.trim());
    if(this.patientTemp && this.patientTemp.id_patient === patientId) {
      return;
    }
    if(isNaN(patientId) || patientId === 0) {
      return Swal.fire('Ingrese un numero de paciente correcto', '', 'warning');
    }
    this.patientService.getPatientByUser(patientId).subscribe({
      next: (resp: boolean) => {
        if(resp) {
          this.loadForm();
          this.patientTemp = this.patientService.patientTemp;
          this.recordService.getRecords(this.patientTemp.id_patient, 3).subscribe(records => {
            this.recordsPatient = records.map(r => {
              r.selected = false
              return r;
            });
          })
        }
      },
    });
  }

  selectRow(id_record: number) {
    const recordFound = this.recordsPatient.find(r => r.id_record === id_record)
    if(recordFound) {
      recordFound.selected = !recordFound.selected;
        if(!this.id_records.includes(recordFound.id_record)) {
          this.id_records.push(recordFound.id_record);
      } else {
        this.id_records = this.id_records.filter(id => id !== recordFound.id_record);
      }
    }
  }

  get getName() {
    return (this.patientTemp) ? `${this.patientTemp?.name} ${this.patientTemp?.last_name}` :'';
  }

  saveAppointment() {
    if(this.appointmentForm.valid){
      const date: string = this.appointmentForm.get('date')?.value;
      const time: string = this.appointmentForm.get('time')?.value;
      const newAppointment: ICreateAppointment = {
        time,
        id_patient: Number(this.patientTemp.id_patient),
        date: new Date(date).toISOString(),
        description: this.appointmentForm.get('description')?.value,
        id_record: this.id_records,
      }
      this.newAppointment.emit(newAppointment);
    }
  }

  findAppointments(event: any) {
    if(!event.value || this.appointmentForm.get('date')?.hasError('isMin')) {
      return;
    }
    this.dateSelected.emit(event.value);
  }

  loadForm() {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.maxLength(1024)],
    }, {
      validators: [
        ValidationDate.validate('date'),
        ValidationTime.validate('date', 'time')
      ],
    });
  }

  validateForm(field: string): boolean | undefined | null {
    const myForm = this.appointmentForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateField(field: string, error: string): boolean | undefined | null {
    return (this.appointmentForm.get(field)?.hasError(error));
  }

}
