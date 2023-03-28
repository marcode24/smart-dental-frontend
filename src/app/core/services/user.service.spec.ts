import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { Router } from '@angular/router';
import { RouterTestingModule } from "@angular/router/testing";
import { environment } from "environments/environment";

import { User } from "@models/user.model";

import { IOptionsSearch } from "@interfaces/options-search.interface";

import { getMockUser, getMockUsers } from "@mocks/user.mock";

import { UserService } from './user.service';

const { base_url } = environment;

describe('User Service', () => {
  let userService: UserService;
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
        UserService,
        {
          provide: Router,
          useValue: routerSpy
        },
      ],
    });

    userService = TestBed.inject(UserService);
    httpController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(userService).toBeTruthy();
  });

  describe('get user by id function', () => {
    it('should return a user with id = 1000', (doneFn) => {
      const userId = 1000;
      const mockUser: User = { ...getMockUser(), id_user: userId };

      userService.getUserByID(userId).subscribe(({user}) => {
        expect(user).toEqual(mockUser);
        expect(user.id_user).toEqual(userId);
        doneFn();
      });

      const url = `${base_url}/users/${userId}`;
      const req = httpController.expectOne(url);
      req.flush({ user: mockUser });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('change code function', () => {
    it('should return a new code', (doneFn) => {
      const newCode = 'nq53490';
      const userId = 1000;

      userService.changeCode(userId).subscribe((resp) => {
        expect(resp.newCode).toBe(newCode);
        doneFn();
      });

      const url = `${base_url}/users/changeCode/${userId}`;
      const req = httpController.expectOne(url);
      req.flush({ newCode });

      expect(req.request.method).toBe('PATCH');
    });
  });

  describe('change status function', () => {
    it('should return 1 if status was changed', (doneFn) => {
      const userId = 1000;
      const newStatus = false;

      userService.changeStatus(userId.toString(), newStatus).subscribe(resp => {
        expect(resp).toBe(1);
        doneFn();
      });

      const url = `${base_url}/users/${userId}`;
      const req = httpController.expectOne(url);
      req.flush(1);

      expect(req.request.method).toBe('PATCH');
    });
  });

  describe('get users function', () => {
    it('should return a list of 10 users without passing options', (doneFn) => {
      const mockUsers: User[] = getMockUsers(10);

      userService.getUsers(false).subscribe(({ users }) => {
        expect(users).toEqual(mockUsers);
        expect(users.length).toEqual(mockUsers.length);
        doneFn();
      });

      const url = `${base_url}/users?`;
      const req = httpController.expectOne(url);
      req.flush({ users: mockUsers });

      expect(req.request.method).toBe('GET');
    });

    it('should return a list of 10 users passing options', (doneFn) => {
      const optionsSearch: IOptionsSearch = {
        limit: 10,
        offset: 0,
        fullname: 'test',
      };
      const { limit, offset, fullname } = optionsSearch;
      const mockUsers: User[] = getMockUsers(limit)
      .map(user => ({ ...user, name: optionsSearch.fullname as string }));

      userService.getUsers(false, optionsSearch).subscribe(({ users }) => {
        expect(users).toEqual(users);
        expect(users.length).toEqual(mockUsers.length);
        expect(users.every(({ name }) => name === fullname)).toBeTrue();
        doneFn();
      });
      const url = base_url + '/users?fullname=' + fullname
        + '&limit=' + limit + '&offset=' + offset;
      const req = httpController.expectOne(url);
      req.flush({ users: mockUsers });

      expect(req.request.method).toBe('GET');
    });

    it('should return a list of 10 users without passing a fullname', (doneFn) => {
      const optionsSearch: IOptionsSearch = {
        limit: 10,
        offset: 0,
        fullname: undefined,
      };
      const { limit, offset } = optionsSearch;
      const mockUsers: User[] = getMockUsers(limit);

      userService.getUsers(false, optionsSearch).subscribe(({ users }) => {
        expect(users).toEqual(users);
        expect(users.length).toEqual(mockUsers.length);
        doneFn();
      });

      const url = base_url + '/users?fullname='
      + '&limit=' + limit + '&offset=' + offset;
      const req = httpController.expectOne(url);
      req.flush({ users: mockUsers });

      expect(req.request.method).toBe('GET');
    });

    it('should return a list of 10 users if passing "all" as "true"', (doneFn) => {
      const mockUsers: User[] = getMockUsers(10);

      userService.getUsers(true).subscribe(({ users }) => {
        expect(users).toEqual(users);
        expect(users.length).toEqual(mockUsers.length);
        doneFn();
      });

      const url = `${base_url}/users?all=${true}`;
      const req = httpController.expectOne(url);
      req.flush({ users: mockUsers });

      expect(req.request.method).toBe('GET');
    });
  });

  describe('update user function', () => {
    it('shoudl return user updated', (doneFn) => {
      const mockUser: User = getMockUser();
      const userId = 1000;

      userService.updateUser(userId, mockUser).subscribe(user => {
        expect(user).toEqual(mockUser);
        doneFn();
      });

      const url = `${base_url}/users/${userId}`;
      const req = httpController.expectOne(url);
      req.flush(mockUser);

      expect(req.request.method).toBe('PUT');
    });
  });

  describe('create user function', () => {
    it('should create a user from user form as admin', (doneFn) => {
      router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

      const newUser: User = getMockUser();
      userService.createUser(newUser).subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/users']);
        doneFn();
      });

      const url = `${base_url}/users`;
      const req = httpController.expectOne(url);
      req.flush({ user: newUser });

      expect(req.request.method).toBe('POST');
    });

    it('should set as user image MALE if gender = "male"', (doneFn) => {
      router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
      const newUser: User = { ...getMockUser(), gender: 'male' };

      userService.createUser(newUser, false).subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/users']);
        doneFn();
      });

      const url = `${base_url}/users`;
      const req = httpController.expectOne(url);
      req.flush({});

      expect(req.request.method).toBe('POST');
    });

    it('should set as user image FEMALE if gender = "female"', (doneFn) => {
      router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
      const newUser: User = { ...getMockUser(), gender: 'female' };

      userService.createUser(newUser, false).subscribe(() => {
        expect(router.navigate).toHaveBeenCalledWith(['/users']);
        doneFn();
      });

      const url = `${base_url}/users`;
      const req = httpController.expectOne(url);
      req.flush({});

      expect(req.request.method).toBe('POST');
    });

    it('should show a message "username already exists"', (doneFn) => {
      const newUser: User = getMockUser();

      userService.createUser(newUser, false).subscribe(() => {
        doneFn();
      });

      const url = `${base_url}/users`;
      const req = httpController.expectOne(url);
      req.flush({ status: 400, message: 'username already in use' });

      expect(req.request.method).toBe('POST');
    });

    it('should save an acces token into session storage', (doneFn) => {
      const newUser: User = getMockUser();
      const accessToken = '12fakdl23a#ads';
      userService.createUser(newUser, true).subscribe(() => {
        expect(sessionStorage.getItem('token')).toBe(accessToken);
        expect(router.navigate).toHaveBeenCalledWith(['/']);
        doneFn();
      });

      const url = `${base_url}/users`;
      const req = httpController.expectOne(url);
      req.flush({ user: newUser, access_token: accessToken });

      expect(req.request.method).toBe('POST');
    });
  });
});
