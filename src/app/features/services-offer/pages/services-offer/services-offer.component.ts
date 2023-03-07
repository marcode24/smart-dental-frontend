import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import Swal from 'sweetalert2';

import { ServiceOfferService } from '@services/service-offer.service';

import { Service } from '@models/service.model';

import { ICardIconRight } from '@interfaces/card-icon-right.interface';

@Component({
  selector: 'app-services-offer',
  templateUrl: './services-offer.component.html',
  styles: [
  ]
})
export class ServicesOfferComponent implements OnInit, OnDestroy {

  public cardsIconData: ICardIconRight[] = [
    {
      title: 'Servicios ofrecidos',
      quantity: 0,
      icon: 'bx-briefcase',
      color: 'primary',
      bg: 'scooter'
    },
    {
      title: 'Servicios activos',
      quantity: 0,
      icon: 'bx-check',
      color: 'success',
      bg: 'ohhappiness'
    },
    {
      title: 'Servicios inactivos',
      quantity: 0,
      icon: 'bx-x',
      color: 'danger',
      bg: 'bloody'
    },
  ];

  private limit = 5;
  private offset = 0;
  private findServiceByName = '';
  public totalServices = 0;
  public services: Service[];
  public showPagination = true;
  private changeDataService: Subscription;
  public isLoadingPage = true;

  constructor(
    private readonly serviceOfferService: ServiceOfferService
  ) { }

  ngOnDestroy(): void {
    this.changeDataService.unsubscribe();
  }

  ngOnInit(): void {
    this.getServices();
    this.changeDataService = this.serviceOfferService.changeDataService
      .subscribe(() => this.getServices());
  }

  getServices() {
    this.serviceOfferService.getServices(this.limit, this.offset, this.findServiceByName)
      .subscribe(resp => {
        const { services, totalActive, totalInactive } = resp;
        this.showPagination = (this.findServiceByName.length > 0) ? false : true;
        this.services = services;
        this.totalServices = totalActive + totalInactive;
        this.cardsIconData[0].quantity = this.totalServices;
        this.cardsIconData[1].quantity = totalActive;
        this.cardsIconData[2].quantity = totalInactive;
        this.isLoadingPage = false;
    });
  }

  findByName(name: string) {
    this.showPagination = false;
    this.findServiceByName = name;
    this.getServices();
  }

  changeLimit(limit: number) {
    this.limit = limit;
    this.offset = 0;
    this.getServices();
  }

  showMessageChangeStatus(
    fullname:string,
    idService: number | undefined,
    newStatus: boolean
  ) {
    if(newStatus) return this.changeStatus(idService, newStatus);
    Swal.fire({
      title: `¿Estás seguro de suspender al servicio: '${fullname}'?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, suspender'
    }).then((result) => {
      if (result.isConfirmed) {
        this.changeStatus(idService, newStatus);
      }
    });
  }

  private changeStatus(idService: number | undefined, newStatus: boolean) {
    this.serviceOfferService.changeStatus(idService?.toString(), newStatus).subscribe({
      next:() => {
        this.getServices();
      },
      error: () => {
        Swal.fire('Ocurrión un error', 'intentalo de nuevo', 'error');
      }
    });
  }

  emitNewService(service?: Service) {
    this.serviceOfferService.isNewService.emit(service);
  }

  get getLimitPagination(): number {
    return this.limit;
  }

  changePage(value: number) {
    this.offset = value;
    this.getServices();
  }

}
