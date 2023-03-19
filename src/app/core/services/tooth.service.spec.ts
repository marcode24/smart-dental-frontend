import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "environments/environment";

import { Tooth } from "@models/tooth.model";

import { IUpdateTooth } from "@interfaces/tooth.interface";

import Storage from "@utils/storage.util";

import { getMockTeeth, getMockTooth } from "@mocks/tooth.mock";

import { ToothService } from "./tooth.service";

const { base_url } = environment;

describe('Tooth Service', () => {
  let toothService: ToothService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ToothService,
      ],
    });

    toothService = TestBed.inject(ToothService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(toothService).toBeTruthy();
  });

  describe('get token function', () => {
    it('should return token', () => {
      const newToken = '1234';
      Storage.saveSessionStorage('token', newToken);
      const token = toothService.token;

      expect(token).toBeTruthy();
      expect(token).toBe(newToken);
    });

    it('should return ""', () => {
      sessionStorage.clear();
      const token = toothService.token;

      expect(token).toBe('');
    });
  });

  describe('getTeeth function', () => {
    it('should return teeth from patient', (doneFn) => {
      const mockTeeth: Tooth[] = getMockTeeth();
      const patientId = 1000;

      toothService.getTeeth(patientId).subscribe((teeth) => {
        expect(teeth).toEqual(mockTeeth);
        expect(teeth.length).toBe(mockTeeth.length);
        doneFn();
      });

      const url = `${base_url}/teeth/patient/${patientId}`;
      const req = httpController.expectOne(url);
      req.flush(mockTeeth);

      expect(req.request.method).toBe('GET');
    });

    it('should return empty array', (doneFn) => {
      const mockTeeth: Tooth[] = [];
      const patientId = 1000;

      toothService.getTeeth(patientId).subscribe((teeth) => {
        expect(teeth).toEqual(mockTeeth);
        expect(teeth.length).toBe(mockTeeth.length);
        doneFn();
      });

      const url = `${base_url}/teeth/patient/${patientId}`;
      const req = httpController.expectOne(url);
      req.flush(mockTeeth);

      expect(req.request.method).toBe('GET');
    });
  });

  describe('update tooth function', () => {
    it('should update tooth', () => {
      const toothId = 17;
      const toothChanges: IUpdateTooth = {
        tooth_number: toothId,
        vestibular: true,
        distal: true,
        mesial: true,
        ligual: true,
        oclusal: true,
        id_service: 1000,
      };

      toothService.update(toothId, toothChanges);

      const url = `${base_url}/teeth/${toothId}`;
      const req = httpController.expectOne(url);
      req.flush(toothChanges);

      expect(req.request.method).toBe('PATCH');
    });
  });

  describe('create tooth function', () => {
    it('should create tooth', () => {
      const newTooth: Tooth = getMockTooth();

      toothService.create(newTooth);

      const url = `${base_url}/teeth`;
      const req = httpController.expectOne(url);
      req.flush(newTooth);

      expect(req.request.method).toBe('POST');
    });

    it('should show error when create tooth', () => {
      const newTooth: Tooth = getMockTooth();

      toothService.create(newTooth);

      const url = `${base_url}/teeth`;
      const req = httpController.expectOne(url);
      req.flush(newTooth, { status: 400, statusText: 'Bad Request' });

      expect(req.request.method).toBe('POST');
    });
  });
});
