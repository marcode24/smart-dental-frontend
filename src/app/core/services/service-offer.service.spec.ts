import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { environment } from "environments/environment";

import { Service } from "@models/service.model";

import { getMockService, getMockServices } from "@mocks/service.mock";

import { ServiceOfferService } from "./service-offer.service";

const { base_url } = environment;

describe('Service Offer Service', () => {
  let serviceOfferService: ServiceOfferService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        ServiceOfferService,
      ],
    });

    serviceOfferService = TestBed.inject(ServiceOfferService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(serviceOfferService).toBeTruthy();
  });

  describe('get services function', () => {
    it('should return a list of 10 services', (doneFn) => {
      const limit = 10;
      const offset = 0;
      const mockServices: Service[] = getMockServices(limit);

      serviceOfferService.getServices(limit, offset).subscribe(({ services }) => {
        expect(services.length).toBe(limit);
        expect(services).toEqual(mockServices);
        doneFn();
      });

      const url = base_url + '/services?' +
         `name=${undefined}&limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush({ services: mockServices });

      expect(req.request.method).toBe('GET');
    });

    it('should return a list of 10 services with name = "test"', (doneFn) => {
      const limit = 10;
      const offset = 0;
      const name = 'test';
      const mockServices: Service[] = getMockServices(limit)
        .map((service) => ({ ...service, name }));

      serviceOfferService.getServices(limit, offset, name).subscribe(({ services }) => {
        expect(services.length).toBe(limit);
        expect(services).toEqual(mockServices);
        expect(services.every((service) => service.name === name)).toBeTruthy();
        doneFn();
      });

      const url = base_url + '/services?' +
         `name=${name}&limit=${limit}&offset=${offset}`;
      const req = httpController.expectOne(url);
      req.flush({ services: mockServices });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('get services active function', () => {
    it('should emit a list of services which not belong to odontogram', () => {
      const odontogram = false;
      const mockServices: Service[] = getMockServices(10)
        .map((service) => ({ ...service, odontogram }));

      serviceOfferService.getServicesActive(odontogram);

      const url = `${base_url}/services/all?odontogram=${odontogram}`;
      const req = httpController.expectOne(url);
      req.flush({ services: mockServices });

      expect(mockServices
          .every((service) => service.odontogram === odontogram))
          .toBeTruthy();

      expect(req.request.method).toBe('GET');
    });

    it('should emit a list of services which belong to odontogram', () => {
      const odontogram = true;
      const mockServices: Service[] = getMockServices(10)
        .map((service) => ({ ...service, odontogram }));

      serviceOfferService.getServicesActive(odontogram);

      const url = `${base_url}/services/all?odontogram=${odontogram}`;
      const req = httpController.expectOne(url);
      req.flush({ services: mockServices });

      expect(mockServices
          .every((service) => service.odontogram === odontogram))
          .toBeTruthy();

      expect(req.request.method).toBe('GET');
    });

    it('should emit a list of services which not belong to odontogram by default', () => {
      const odontogram = false;
      const mockServices: Service[] = getMockServices(10)
        .map((service) => ({ ...service, odontogram }));

      serviceOfferService.getServicesActive();

      const url = `${base_url}/services/all?odontogram=${odontogram}`;
      const req = httpController.expectOne(url);
      req.flush({ services: mockServices });

      expect(mockServices
          .every((service) => service.odontogram === odontogram))
          .toBeTruthy();

      expect(req.request.method).toBe('GET');
    });
  });

  describe('change status function', () => {
    it('should change status of a service', (doneFn) => {
      const id_service = 1000;
      const status = true;
      const mockService: Service = { ...getMockService(), status, id_service};

      serviceOfferService.changeStatus(id_service.toString(), status)
        .subscribe((service) => {
          expect(service).toEqual(mockService);
          doneFn();
      });

      const url = `${base_url}/services/${id_service}`;
      const req = httpController.expectOne(url);
      req.flush(mockService);

      expect(req.request.method).toBe('PATCH');
    });
  });

  describe('create service function', () => {
    it('should create a service', () => {
      const mockService: Service = getMockService();

      serviceOfferService.create(mockService);

      const url = `${base_url}/services`;
      const req = httpController.expectOne(url);
      req.flush(mockService);

      expect(req.request.method).toBe('POST');
    });

    it('should show an error when create a service', () => {
      const mockService: Service = getMockService();

      serviceOfferService.create(mockService);

      const url = `${base_url}/services`;
      const req = httpController.expectOne(url);
      req.flush(mockService, { status: 400, statusText: 'Bad Request' });

      expect(req.request.method).toBe('POST');
    });
  });

  describe('update service function', () => {
    it('should update a service', () => {
      const serviceId = 1000;
      const mockService: Service = { ...getMockService(), id_service: serviceId };

      serviceOfferService.update(mockService, serviceId);

      const url = `${base_url}/services/${serviceId}`;
      const req = httpController.expectOne(url);
      req.flush(mockService);

      expect(req.request.method).toBe('PUT');
    });

    it('should show an error when update a service', () => {
      const serviceId = 1000;
      const mockService: Service = { ...getMockService(), id_service: serviceId };

      serviceOfferService.update(mockService, serviceId);

      const url = `${base_url}/services/${serviceId}`;
      const req = httpController.expectOne(url);
      req.flush(mockService, { status: 400, statusText: 'Bad Request' });

      expect(req.request.method).toBe('PUT');
    });
  });
});
