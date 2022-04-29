import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';

import { IResponseService } from '@interfaces/response.interface';

import { Service } from '@models/service.model';
import Swal from 'sweetalert2';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ServiceOfferService {

  public changeDataService: EventEmitter<boolean> = new EventEmitter<boolean>();
  public isNewService: EventEmitter<Service> = new EventEmitter<Service>();
  public servicesActive: EventEmitter<Service[]> = new EventEmitter<Service[]>();
  public servicesActiveOdontogram: EventEmitter<Service[]> = new EventEmitter<Service[]>();

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }

  get token(): string {
    return this.cookieService.get('token');
  }

  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    };
  }

  getServices(limit: number, offset: number, name?: string): Observable<IResponseService> {
    const url = `${base_url}/services?name=${name || ''}&limit=${limit}&offset=${offset}`;
    return this.http.get<IResponseService>(url, this.headers);
  }

  getServicesActive(odontogram: boolean = false): void {
    const url = `${base_url}/services/all?odontogram=${odontogram}`;
    this.http.get<IResponseService>(url, this.headers).subscribe(({ services }) => {
      (!odontogram) ? this.servicesActive.emit(services) : this.servicesActiveOdontogram.emit(services);
    });
  }

  changeStatus(idService: string | undefined, status: boolean): Observable<Service> {
    const url = `${base_url}/services/${idService}`;
    return this.http.patch<Service>(url, { status }, this.headers);
  }

  create(service: Service) {
    const url = `${base_url}/services`;
    this.http.post(url, service, this.headers).subscribe({
      next: () => {
        this.changeDataService.emit(true);
        Swal.fire('Servicio creado correctamente', '', 'success');
      },
      error: (e) => {
        Swal.fire('Ocurrio un error al crear el servicio', 'intentelo de nuevo', 'error');
      }
    })
  }

  update(service: Service, id_service: number) {
    const url = `${base_url}/services/${id_service}`;
    this.http.put(url, service, this.headers).subscribe({
      next: () => {
        this.changeDataService.emit(true);
        Swal.fire('Servicio actualizado correctamente', '', 'success');
      },
      error: (e) => {
        Swal.fire('Ocurrio un error al actualizar', 'intentelo de nuevo', 'error');
      }
    })
  }

}
