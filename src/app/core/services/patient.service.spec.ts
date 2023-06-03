import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "environments/environment";

import { Patient } from "@models/patient.model";
import { User } from "@models/user.model";

import { IOptionsSearch } from "@interfaces/options-search.interface";

import Storage from "@utils/storage.util";

import { getMockPatient, getMockPatients } from "@mocks/patient.mock";

import { AuthService } from "./auth.service";
import { PatientService } from "./patient.service";

describe('Patient Service', () => {
  let patientService: PatientService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let httpController: HttpTestingController;

  beforeEach(() => {
    const spyAuth = jasmine.createSpyObj(
      'AuthService',
      [],
      { userActive: { id_user: 1000, role: 'ADMIN' }}
    );
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        PatientService,
        {
          provide: AuthService,
          useValue: spyAuth
        },
      ],
    });

    patientService = TestBed.inject(PatientService);
    httpController = TestBed.inject(HttpTestingController);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  afterEach(() => {
    httpController.verify();
  });

  it('patient service should be created', () => {
    expect(patientService).toBeTruthy();
  });

  describe('get token function', () => {
    it('should return token', () => {
      const newToken = '1234';
      Storage.saveSessionStorage('token', newToken);
      const token = patientService.token;

      expect(token).toBeTruthy();
      expect(token).toBe(newToken);
    });

    it('should return ""', () => {
      sessionStorage.clear();
      const token = patientService.token;

      expect(token).toBe('');
    });
  });

  describe('get patients function', () => {
    it('should return a list with 10 patients', (doneFn) => {
      const optionsParams: IOptionsSearch = {
        limit: 10,
        offset: 0,
        fullname: undefined
      };
      const mockPatients: Patient[] = getMockPatients(optionsParams.limit);

      patientService.getPatients(optionsParams).subscribe(({ patients }) => {
        expect(patients).toEqual(mockPatients);
        expect(patients.length).toBe(optionsParams.limit);
        doneFn();
      });

      const { limit, offset, fullname } = optionsParams;
      const url = environment.base_url + '/patients?name=' + fullname +
        '&limit=' + limit + '&offset=' + offset;
      const http = httpController.expectOne(url);
      http.flush({ patients: mockPatients });

      expect(http.request.method).toBe('GET');
    });
  });

  describe('get patients by user function', () => {
    it('should return a list with 5 patients from id_user 1000', (doneFn) => {
      const optionsParams: IOptionsSearch = {
        limit: 5,
        offset: 0,
        fullname: undefined,
      };
      const userId = 1000;
      const mockPatients: Patient[] = getMockPatients(optionsParams.limit)
        .map((mock) => {
          (mock.user as User).id_user = userId;
          return mock;
        });

      patientService.getPatientsByUser(optionsParams, userId)
        .subscribe(({ patients }) => {
          expect(patients).toEqual(mockPatients);
          expect(patients.length).toBe(optionsParams.limit);
          patients.forEach(patient => {
            expect((patient.user as User).id_user).toEqual(userId);
          });
          doneFn();
      });

      const { limit, offset, fullname } = optionsParams;
      const url = environment.base_url + '/patients/' + userId + '?name=' + fullname
        + '&limit=' + limit + '&offset=' + offset;
      const http = httpController.expectOne(url);
      http.flush({ patients: mockPatients });

      expect(http.request.method).toBe('GET');
    });
  });

  describe('change status patient function', () => {
    it('should change status to false', (doneFn) => {
      const patientId = 1000;
      const newStatus = false;

      patientService.changeStatus(patientId, newStatus).subscribe(([resp]) => {
        expect(resp).toBe(1);
        doneFn();
      });

      const url = `${environment.base_url}/patients/${patientId}`;
      const http = httpController.expectOne(url);
      http.flush([1]);

      expect(http.request.method).toEqual('PATCH');
      expect(http.request.body).toEqual({ status: newStatus });
    });
  });

  describe('change user from patient function', () => {
    it('should change user', (doneFn) => {
      const patientId = 1000;
      const userId = 1001;

      patientService.changeUser(patientId, userId).subscribe(([resp]) => {
        expect(resp).toBe(1);
        doneFn();
      });

      const url = `${environment.base_url}/patients/${patientId}/newUser/${userId}`;
      const http = httpController.expectOne(url);
      http.flush([1]);

      expect(http.request.method).toEqual('PATCH');
      expect(http.request.body).toEqual({});
    });
  });

  describe('create patient function', () => {
    it('should return the patient created', (doneFn) => {
      const newPatient: Patient = {
        name: 'ejemplo',
        last_name: 'ejemplo',
        id_user: 1000,
        birth_date: new Date(),
        gender: 'female',
        email: 'ejemplo@gmail.com',
        phone_number: 1234567890,
        street: 'caller',
        number: 123,
        cp: 12345,
        city: 'CDMX',
        country: 'Mexico',
        image: 'https',
        status: true,
        familiar: {
          familiar_name: 'ejemplo',
          familiar_last_name: 'ejemplo',
          relationship: 'mother',
          familiar_gender: 'female',
          familiar_email: 'ejemplo@gmail.com',
          familiar_phone_number: 1234567890
        }
      };

      patientService.createPatient(newPatient).subscribe(patient => {
        expect(patient).toEqual(newPatient);
        doneFn();
      });

      const url = `${environment.base_url}/patients`;
      const http = httpController.expectOne(url);
      http.flush(newPatient);

      expect(http.request.method).toEqual('POST');
      expect(http.request.body).toEqual(newPatient);
    });
  });

  describe('get patient by user function', () => {
    it('should return true if admin = true and '
      + 'patient belongs to user', (doneFn) => {
      const mockPatient: Patient = getMockPatient();
      const patientId = 1000;
      const userId = 1000;
      mockPatient.id_user = userId;

      patientService.getPatientByUser(patientId).subscribe(available => {
        expect(available).toBeTrue();
        doneFn();
      });

      const url = environment.base_url + '/patients/patient/' + patientId + '/user/'
        + userId + '?isAdmin=' + true;
      const http = httpController.expectOne(url);
      http.flush({ patient: mockPatient });

      expect(http.request.method).toEqual('GET');
    });

    it('should return false if admin = false '
      + 'and patient not belong to user', (doneFn) => {
      const patientId  = 1000;
      const userId = 1000;

      patientService.getPatientByUser(patientId).subscribe(available => {
        expect(available).toBeFalsy();
        doneFn();
      });

      const url = environment.base_url + '/patients/patient/' + patientId + '/user/'
      + userId + '?isAdmin=' + true;
      const http = httpController.expectOne(url);
      http.flush(null);

      expect(http.request.method).toEqual('GET');
    });
  });

  describe('update info patient function', () => {
    it('should return 0 when update correctly info', () => {
      const patientId = 1000;
      const familiarId = 1000;
      const changes: Patient = getMockPatient();
      changes.name = 'changing name';

      patientService.updateInfo(patientId, familiarId, changes);

      const url = `${environment.base_url}/patients/${patientId}/${familiarId}`;
      const http = httpController.expectOne(url);
      http.flush([0, 0]);

      expect(http.request.method).toEqual('PUT');
    });
  });
});
