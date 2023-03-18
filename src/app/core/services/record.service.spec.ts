import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "environments/environment";

import { Record } from "@models/record.model";

import { ICreateRecord } from "@interfaces/create-record.interface";
import { IStatistics } from "@interfaces/statistics.interface";

import Storage from "@utils/storage.util";

import { getMockRecords } from "@mocks/record.mock";
import { getMockStatistics } from "@mocks/statistics.mock";

import { RecordService } from "./record.service";

const { base_url } = environment;

describe('Record Service', () => {
  let recordService: RecordService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        RecordService,
      ],
    });

    recordService = TestBed.inject(RecordService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(recordService).toBeTruthy();
  });

  describe('get token function', () => {
    it('should return token', () => {
      const newToken = '1234';
      Storage.saveSessionStorage('token', newToken);
      const token = recordService.token;

      expect(token).toBeTruthy();
      expect(token).toBe(newToken);
    });

    it('should return ""', () => {
      sessionStorage.clear();
      const token = recordService.token;

      expect(token).toBe('');
    });
  });

  describe('get records function', () => {
    it('should return records', (doneFn) => {
      const mockRecords: Record[] = getMockRecords(3);
      const patientId = 1000;
      const filter = 1;

      recordService.getRecords(patientId, filter).subscribe(records => {
        expect(records).toEqual(mockRecords);
        expect(records.length).toBe(mockRecords.length);
        doneFn();
      });

      const url = `${base_url}/records/${patientId}?filter=${filter}`;
      const req = httpController.expectOne(url);
      req.flush(mockRecords);

      expect(req.request.method).toBe('GET');
    });
  });

  describe('create record function', () => {
    it('should create record', () => {
      const newRecord: ICreateRecord = {
        id_service: 1000,
        id_patient: 1000,
        quantity: 1,
        realization_date: new Date(),
        tooth_number: 14,
        vestibular: false,
        mesial: true,
        distal: false,
        ligual: false,
        oclusal: true,
      };

      recordService.createRecord(newRecord);

      const url = `${base_url}/records`;
      const req = httpController.expectOne(url);
      req.flush(newRecord);

      expect(req.request.method).toBe('POST');

    });
  });

  describe('get statistics function', () => {
    it('should return statistics', (doneFn) => {
      const limit = 5;
      const mockStatistics: IStatistics[] = getMockStatistics(limit);

      recordService.getStatistics(limit).subscribe(statistics => {
        expect(statistics).toEqual(mockStatistics);
        expect(statistics.length).toBe(mockStatistics.length);
        doneFn();
      });

      const url = `${base_url}/records/statistics?limit=${limit}`;
      const req = httpController.expectOne(url);
      req.flush(mockStatistics);

      expect(req.request.method).toBe('GET');
    });

    it('should return by default 3 statistics', (doneFn) => {
      const limit = 3;
      const mockStatistics: IStatistics[] = getMockStatistics(limit);

      recordService.getStatistics().subscribe(statistics => {
        expect(statistics).toEqual(mockStatistics);
        expect(statistics.length).toBe(mockStatistics.length);
        doneFn();
      });

      const url = `${base_url}/records/statistics?limit=${limit}`;
      const req = httpController.expectOne(url);
      req.flush(mockStatistics);

      expect(req.request.method).toBe('GET');
    });
  });
});
