import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "environments/environment";

import { ILogin } from "@interfaces/login.interface";
import { IResponseLogin } from "@interfaces/response.interface";

import { getMockUser } from "@mocks/user.mock";

import { AuthService } from "./auth.service";

describe('Auth Service', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
      providers: [
        AuthService,
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  describe('login function', () => {
    it('should return user and access token', (doneFn) => {
      const dataLogin: ILogin = {
        username: 'example',
        password: 'mysecretpassword',
      };

      const mockDataLogin: IResponseLogin = {
        user: getMockUser(),
        access_token: '12fkasdlñh235843p9afsd',
      };

      authService.login(dataLogin).subscribe(({ access_token, user }) => {
        expect(access_token).toEqual(mockDataLogin.access_token);
        expect(user).toEqual(mockDataLogin.user);
        doneFn();
      });

      const url = `${environment.base_url}/auth/login`;
      const http = httpController.expectOne(url);
      http.flush(mockDataLogin);

      expect(http.request.method).toEqual('POST');
    });
  });

  describe('validate code function', () => {
    it('should return false if code is not valid', () => {
      const code = '1234';

      authService.validateCode(code).subscribe((valid) => {
        expect(valid).toBeFalsy();
      });

      const url = `${environment.base_url}/auth/code/${code}`;
      const http = httpController.expectOne(url);
      http.flush({ valid: false });

      expect(http.request.method).toEqual('GET');
    });

    it('should return true if code is valid', () => {
      const code = '1234';

      authService.validateCode(code).subscribe((valid) => {
        expect(valid).toBeTruthy();
      });

      const url = `${environment.base_url}/auth/code/${code}`;
      const http = httpController.expectOne(url);
      http.flush({ valid: true });

      expect(http.request.method).toEqual('GET');
    });

    it('should save code in session storage if code is valid', () => {
      const code = '1234';

      authService.validateCode(code).subscribe((valid) => {
        expect(valid).toBeTruthy();
        expect(sessionStorage.getItem('code')).toEqual(code);
      });

      const url = `${environment.base_url}/auth/code/${code}`;
      const http = httpController.expectOne(url);
      http.flush({ valid: true });

      expect(http.request.method).toEqual('GET');
    });
  });

  describe('logout function', () => {
    it('should remove token from session storage', () => {
      sessionStorage.setItem('token', '1234');

      authService.logout();

      expect(sessionStorage.getItem('token')).toBeNull();
    });

    it('should navigate to login page', () => {
      router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

      authService.logout();

      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('get code function', () => {
    it('should return code from session storage', () => {
      const code = '1234';
      sessionStorage.setItem('code', code);

      const codeFromStorage = authService.code;

      expect(codeFromStorage).toEqual(code);
    });

    it('should return "" if code is not in session storage', () => {
      sessionStorage.removeItem('code');
      const codeFromStorage = authService.code;

      expect(codeFromStorage).toEqual('');
    });
  });

  describe('validate token function', () => {
    it('should return false if token is not valid', () => {
      authService.validateToken().subscribe((valid) => {
        expect(valid).toBeFalsy();
      });

      const url = `${environment.base_url}/auth/renew`;
      const http = httpController.expectOne(url);
      http.flush({});

      expect(http.request.method).toEqual('GET');
    });

    it('should return true if token is valid', () => {
      authService.validateToken().subscribe((valid) => {
        expect(valid).toBeTruthy();
      });

      const url = `${environment.base_url}/auth/renew`;
      const http = httpController.expectOne(url);
      http.flush({ user: getMockUser() });

      expect(http.request.method).toEqual('GET');
    });

    it('should save token in session storage if token is valid', () => {
      const token = '1234';
      authService.validateToken().subscribe((valid) => {
        expect(valid).toBeTruthy();
        expect(sessionStorage.getItem('token')).toEqual(token);
      });

      const url = `${environment.base_url}/auth/renew`;
      const http = httpController.expectOne(url);
      http.flush({ valid: true, user: getMockUser(), access_token: token });

      expect(http.request.method).toEqual('GET');
    });
  });
});
