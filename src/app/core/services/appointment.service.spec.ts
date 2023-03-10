import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'environments/environment';

import { Appointment } from '@models/appointment.model';

import { IChangeStatus, ICreateAppointment } from '@interfaces/appointment.interface';

import { StatusAppointment } from '@enums/status.enum';

import { getMockAppointment, getMockAppointments } from '@mocks/appointment.mock';

import { AppointmentService } from "./appointment.service";
import { AuthService } from './auth.service';

describe('Appointment Service', () => {
  let appointmentService: AppointmentService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let httpController: HttpTestingController;

  beforeEach(() => {
    const spy = jasmine.createSpyObj(
      'AuthService',
      {},
      { userActive: { id_user: 1000 }}
    );
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        AppointmentService,
        {
          provide: AuthService,
          useValue: spy
        },
      ],
    });

    appointmentService = TestBed.inject(AppointmentService);
    httpController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpController.verify();
  });

  it('appointment service should be created', () => {
    expect(appointmentService).toBeTruthy();
  });

  describe('create appointment function', () => {
    it('should return true if the appointment was created', (doneFn) => {
      const newAppointment: ICreateAppointment = {
        id_patient: 1000,
        date: new Date().toISOString(),
        time: new Date().getTime().toString(),
        id_record: [],
        description: 'example of description',
        id_user: 1000,
      };

      appointmentService.create(newAppointment).subscribe(created => {
        expect(created).toBe(true);
        doneFn();
      });

      const url = `${environment.base_url}/appointments`;
      const http = httpController.expectOne(url);
      http.flush(true);

      expect(http.request.method).toEqual('POST');
      expect(http.request.body).toEqual(newAppointment);
    });
  });

  describe('change status appointment function', () => {
    it('should change status', (doneFn) => {
      const appointmentChanges: IChangeStatus = {
        id_appointment: 1000,
        status: 'DONE',
      };

      appointmentService.changeStatus(appointmentChanges).subscribe(resp => {
        expect(resp).toEqual({ status: 'DONE' });
        doneFn();
      });

      const { id_appointment } = appointmentChanges;
      const url = `${environment.base_url}/appointments/${id_appointment}`;
      const http = httpController.expectOne(url);
      http.flush({ status: 'DONE' });

      expect(http.request.method).toEqual('PATCH');
      expect(http.request.body).toEqual({ status: 'DONE' });
    });
  });

  describe('get appointments by patient function', () => {
    it('should return a list of appointments', (doneFn) => {
      const mockAppointments: Appointment[] = getMockAppointments();
      const patientId = 1000;

      appointmentService.getAppointmentsByPatient(patientId).subscribe(appointments => {
        expect(appointments.length).toEqual(mockAppointments.length);
        expect(appointments).toEqual(mockAppointments);
        doneFn();
      });

      const url = `${environment.base_url}/appointments/patient/${patientId}`;
      const http = httpController.expectOne(url);
      http.flush(mockAppointments);

      expect(http.request.method).toEqual('GET');
    });
  });

  describe('get appointments by user function', () => {
    it('should return a list of appointments "PENDING"', (doneFn) => {
      const status = StatusAppointment.PENDING;
      const mockAppointments: Appointment[] = [
        { ...getMockAppointment(), status },
        { ...getMockAppointment(), status },
        { ...getMockAppointment(), status },
      ];

      appointmentService.getAppointmentsByUser(status)
        .subscribe(({total, appointments}) => {
          expect(appointments.length).toEqual(mockAppointments.length);
          expect(total).toBe(mockAppointments.length);
          appointments.forEach(appointment => {
            expect(appointment.status).toBe(StatusAppointment.PENDING);
          });
          doneFn();
      });

      const url = `${environment.base_url}/appointments/user/${1000}?status=${status}`;
      const http = httpController.expectOne(url);
      http.flush({total: mockAppointments.length, appointments: mockAppointments });

      expect(http.request.method).toEqual('GET');
    });

    it('should send options params with limit 10 and offset 3', (doneFn) => {
      const limit = 10;
      const offset = 3;
      const status = StatusAppointment.PENDING;

      const mockAppointments: Appointment[] = getMockAppointments(limit);

      appointmentService.getAppointmentsByUser('PENDING', { limit, offset })
        .subscribe(({ total, appointments }) => {
          expect(appointments.length).toEqual(mockAppointments.length);
          expect(total).toBe(mockAppointments.length);
          doneFn();
        });

      const url = environment.base_url + '/appointments/user/' + 1000
        + '?status=' + status + '&limit=' + limit + '&offset=' + offset;
      const http = httpController.expectOne(url);
      http.flush({ total: mockAppointments.length, appointments: mockAppointments });

      expect(http.request.method).toEqual('GET');
    });

    it('should send options params with limit 10 and offset 3 and '
    +'fullname "example one"', (doneFn) => {
      const limit = 10;
      const offset = 3;
      const status = StatusAppointment.PENDING;
      const fullname = 'example';

      const mockAppointments: Appointment[] = getMockAppointments(limit);

      appointmentService.getAppointmentsByUser('PENDING', { limit, offset, fullname })
        .subscribe(({ total, appointments }) => {
          expect(appointments.length).toEqual(mockAppointments.length);
          expect(total).toBe(mockAppointments.length);
          doneFn();
        });

      const url = environment.base_url + '/appointments/user/' + 1000 + '?status='
      + status + '&limit=' + limit + '&offset=' + offset + '&fullname=' + fullname;
      const http = httpController.expectOne(url);
      http.flush({ total: mockAppointments.length, appointments: mockAppointments });

      expect(http.request.method).toEqual('GET');
    });

    it('should send options params with limit 10 and offset 3 and '
    + 'fullname "example one" and date "2021-01-01"', (doneFn) => {
      const limit = 10;
      const offset = 3;
      const status = StatusAppointment.PENDING;
      const fullname = 'example';
      const date = '2021-01-01';

      const mockAppointments: Appointment[] = getMockAppointments(limit);

      appointmentService
        .getAppointmentsByUser('PENDING', { limit, offset, fullname}, date)
        .subscribe(({ total, appointments }) => {
          expect(appointments.length).toEqual(mockAppointments.length);
          expect(total).toBe(mockAppointments.length);
          doneFn();
        });

      const url = environment.base_url + '/appointments/user/' + 1000 + '?status='
        + status + '&limit=' + limit + '&offset=' + offset + '&fullname=' + fullname
        + '&date=' + date;
      const http = httpController.expectOne(url);
      http.flush({ total: mockAppointments.length, appointments: mockAppointments });

      expect(http.request.method).toEqual('GET');
    });
  });
});

