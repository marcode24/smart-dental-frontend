import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ServiceOfferService } from '@services/service-offer.service';

import { Service } from '@models/service.model';

import { RegexClass } from '@utils/regex.util';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit, OnDestroy {
  private regexExpressions = RegexClass;
  private isNewService: Subscription;
  private isUpdate = false;
  private serviceTemp: Service;
  public serviceForm: FormGroup = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.TEXT_SERVICE)
    ]],
    description: ['', Validators.pattern(this.regexExpressions.TEXT_SERVICE)],
    price: ['', [
      Validators.required,
      Validators.pattern(this.regexExpressions.PRICE)
    ]],
    status: [true, Validators.required],
    odontogram: [false],
    color: ['#008cff'],
  });

  constructor(
    private fb: FormBuilder,
    private serviceOfferService: ServiceOfferService,
  ) { }

  ngOnDestroy(): void {
    this.isNewService.unsubscribe();
  }

  ngOnInit(): void {
    this.isNewService = this.serviceOfferService.isNewService.subscribe(service => {
      if(service) {
        this.isUpdate = true;
        this.serviceTemp = service;
        this.loadFormData();
      } else {
        this.serviceForm.reset();
        this.serviceForm.get('status')?.setValue(true);
        this.serviceForm.get('odontogram')?.setValue(false);
        this.isUpdate = false;
      }
    });
  }

  loadFormData() {
    const { name, description, price, status, odontogram, color } = this.serviceTemp;
    this.serviceForm.get('name')?.setValue(name);
    this.serviceForm.get('description')?.setValue(description);
    this.serviceForm.get('price')?.setValue(price);
    this.serviceForm.get('status')?.setValue(status);
    this.serviceForm.get('odontogram')?.setValue(odontogram);
    this.serviceForm.get('color')?.setValue(color);
  }

  validateForm(field: string): boolean | undefined | null {
    const myForm = this.serviceForm.get(field);
    return myForm?.errors && (myForm?.dirty || myForm?.touched);
  }

  validateField(field: string, error: string): boolean | undefined | null {
    return (this.serviceForm.get(field)?.hasError(error));
  }

  chooseColor(): boolean {
    return this.serviceForm.get('odontogram')?.value;
  }

  saveService() {
    const includeOdontogram = this.serviceForm.get('odontogram')?.value;
    if(!includeOdontogram) {
      this.serviceForm.get('color')?.setValue(null);
    }
    const dataService: Service = {
      ...this.serviceForm.value,
      status: JSON.parse(this.serviceForm.get('status')?.value),
    };
    if(this.isUpdate) {
      return this.serviceOfferService
        .update(dataService, Number(this.serviceTemp.id_service));
    }
    this.serviceOfferService.create(dataService);
  }

}
