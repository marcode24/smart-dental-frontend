import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

import { map, Observable } from 'rxjs';

import Swal from 'sweetalert2';

import { User } from '@models/user.model';

import { IOptionsSearch } from '@interfaces/options-search.interface';
import { IResponseUser, IResponseUsers } from '@interfaces/response.interface';

import Storage from '@utils/storage.util';

import { Gender } from '@enums/gender.enum';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  get token(): string {
    return sessionStorage.getItem('token') || '';
  }

  get code(): string {
    return sessionStorage.getItem('code') || '';
  }

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  createUser(data: User, fromAuth = false) {
    data.image = (data.gender === 'male')
    ? Gender.MALE
    : (data.gender === 'female')
      ? Gender.FEMALE
      : Gender.OTHER;
    const url = `${base_url}/users`;
    return this.http.post(url, data, {}).pipe(map((resp: any) => {
      if(resp.status === 400) {
        if(resp.message === 'username already in use') {
          return Swal.fire('Nombre de usuario no disponible', '', 'error');
        }
      }
      if(fromAuth) {
        Storage.deleteSessionStorage('code');
        Storage.saveSessionStorage('token', resp.access_token);
        return this.router.navigate(['/']);
      }
      Swal.fire('Usuario creado correctamente', '', 'success');
      localStorage.removeItem('userTemp');
      return this.router.navigate(['/users']);
    }));
  }

  getUsers(all: boolean, optionsSearch?: IOptionsSearch) {
    let url = `${base_url}/users?`;
    if(optionsSearch) {
      const { limit, offset, fullname } = optionsSearch;
      url = `${url}fullname=${fullname || ''}&limit=${limit}&offset=${offset}`;
    }
    if(all) {
      url = `${url}all=${all}`;
    }
    return this.http.get<IResponseUsers>(url, this.headers);
  }

  changeStatus(idUser: string | undefined, status: boolean): Observable<number> {
    const url = `${base_url}/users/${idUser}`;
    return this.http.patch<number>(url, { status }, this.headers );
  }

  changeCode(idUser: number | undefined): Observable<any> {
    const url = `${base_url}/users/changeCode/${idUser}`;
    return this.http.patch<any>(url, { }, this.headers);
  }

  getUserByID(userID: number): Observable<IResponseUser> {
    const url = `${base_url}/users/${userID}`;
    return this.http.get<IResponseUser>(url, this.headers);
  }

  updateUser(userId: number | undefined, data: User): Observable<User | null> {
    const url = `${base_url}/users/${userId}`;
    return this.http.put<User>(url, data, this.headers).pipe(map((resp) => {
      return resp;
    }));
  }

}
