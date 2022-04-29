import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RecordService } from '@services/record.service';
import { ServiceOfferService } from '@services/service-offer.service';

import { Service } from '@models/service.model';

import { ICreateRecord } from '@interfaces/create-record.interface';

@Component({
  selector: 'app-modal-service',
  templateUrl: './modal-service.component.html',
  styles: [
  ]
})
export class ModalServiceComponent implements OnInit, OnDestroy {

  @Input() patientIdTemp: number | undefined;

  private servicesActive: Subscription;
  public services: Service[];
  private serviceSelected: Service | undefined;

  public price: number;
  public subtotal: number;
  public quantity: number = 1;

  constructor(
    private serviceOfferService: ServiceOfferService,
    private recordService: RecordService,
  ) { }

  ngOnDestroy(): void {
    this.servicesActive.unsubscribe();
  }

  ngOnInit(): void {
    this.servicesActive = this.serviceOfferService.servicesActive.subscribe((services: Service[]) => {
      this.services = services
      if(this.services.length > 0) {
        this.serviceSelected = this.services[0];
        this.price = this.serviceSelected.price;
        this.subtotal = this.serviceSelected.price * this.quantity;
        this.quantity = 1;
      }
    });
  }

  changeService(event: any) {
    const value = Number(event.target.value);
    this.serviceSelected = this.services.find(s => s.id_service === value);
    this.price = Number(this.serviceSelected?.price);
    this.quantity = 1;
    this.setSubtotal();
  }

  changeQuantity(event: string) {
    const value = +(Number(event).toFixed());
    this.quantity = (value > 0 && value <= 10) ? value : 1;
    this.setSubtotal();
  }

  setSubtotal() {
    this.subtotal = this.price * this.quantity;
  }

  createService() {
    const newRecord: ICreateRecord = {
      id_patient: Number(this.patientIdTemp),
      id_service: Number(this.serviceSelected?.id_service),
      quantity: this.quantity,
      realization_date: new Date(),
    }
    this.recordService.createRecord(newRecord);
  }

}
