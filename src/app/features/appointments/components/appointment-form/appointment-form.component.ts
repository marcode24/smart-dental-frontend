import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { Patient } from '@models/patient.model';
import { Record } from '@models/record.model';

import { PatientService } from '@services/patient.service';
import { RecordService } from '@services/record.service';
import { ICreateAppointment } from '@interfaces/appointment.interface';

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
    this.loadForm();
  }

  findPatient(value: string) {
    const patientId = Number(value.trim());
    if(isNaN(patientId)) {
      return Swal.fire('Ingrese un numero de paciente correcto', '', 'warning');
    }
    this.patientService.getPatientByUser(patientId).subscribe({
      next: (resp: boolean) => {
        if(resp) {
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
    const fullname = (this.patientTemp) ? `${this.patientTemp?.name} ${this.patientTemp?.last_name}` :'';
    return fullname;
  }

  saveAppointment() {
    if(this.appointmentForm.valid){
      const date: string = this.appointmentForm.get('date')?.value;
      const time: string = this.appointmentForm.get('time')?.value;
      let [year, month, day] = date.split('-');
      let [hours, minutes] = time.split(':');
      const newAppointment: ICreateAppointment = {
        id_patient: Number(this.patientTemp.id_user),
        date: new Date(+year,+month-1, +day, +hours, +minutes).toISOString(),
        description: this.appointmentForm.get('description')?.value,
        id_record: this.id_records,
      }
      this.newAppointment.emit(newAppointment);
    }
  }

  findAppointments(event: any) {
    this.dateSelected.emit(event.value);
  }

  loadForm() {
    this.appointmentForm = this.fb.group({
      date: ['', Validators.required],
      time: ['', Validators.required],
      description: ['', Validators.maxLength(1024)],
    });
  }

}
