import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';

import { Subscription } from 'rxjs';

import { PatientService } from '@services/patient.service';
import { ServiceOfferService } from '@services/service-offer.service';
import { ToothService } from '@services/tooth.service';

import { Service } from '@models/service.model';
import { Tooth } from '@models/tooth.model';

import { IUpdateTooth } from '@interfaces/tooth.interface';

import { ToothT } from '@customTypes/tooth.type';

@Component({
  selector: 'app-modal-odontogram',
  templateUrl: './modal-odontogram.component.html',
  styles: [
  ]
})
export class ModalOdontogramComponent implements OnInit, OnChanges, OnDestroy {

  @Input() tooth: Tooth | undefined;

  public toothSelected: Tooth;
  public isNew = true;
  public services: Service[];

  private patientIdActive: number;
  private servicesActive: Subscription;

  constructor(
    private serviceOfferService: ServiceOfferService,
    private patientService: PatientService,
    private toothService: ToothService
  ) {
    this.patientIdActive = Number(patientService.patientTemp.id_patient);
   }

  ngOnDestroy(): void {
    this.servicesActive.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const tooth = changes['tooth'].currentValue;
    this.toothSelected = tooth;
    this.isNew = (this.toothSelected?.record) ? false : true;
  }

  ngOnInit(): void {
    this.servicesActive = this.serviceOfferService.servicesActiveOdontogram
      .subscribe(services => {
        this.services = services;
        if(services.length > 0 && (!this.toothSelected.record || !this.tooth?.color)) {
          this.toothSelected.color = this.services[0].color;
          this.toothSelected.id_service = this.services[0].id_service;
        }
    });
  }

  saveTooth() {
    const toothInfo: Tooth = {
      tooth_number: this.toothSelected.tooth_number,
      vestibular: this.toothSelected.vestibular || false,
      ligual: this.toothSelected.ligual || false,
      distal: this.toothSelected.distal || false,
      mesial: this.toothSelected.mesial || false,
      oclusal: this.toothSelected.oclusal || false,
    };

    if(this.isNew && this.toothPartSelected()) {
      const newTooth: Tooth = {
        ...toothInfo,
        id_service: this.toothSelected.id_service,
        id_patient: this.patientIdActive,
      };
      return this.toothService.create(newTooth);
    }
    if(!this.isNew && this.toothPartSelected()) {
      const id_service =
          this.toothSelected.id_service || this.toothSelected.record?.id_service;
      const updateTooth: IUpdateTooth = {
        ...toothInfo,
        id_service: Number(id_service)
      } as IUpdateTooth;
      const { id_tooth } = this.toothSelected;
      return this.toothService.update(Number(id_tooth), updateTooth);
    }
  }

  private toothPartSelected() {
    const { vestibular, ligual, distal, mesial, oclusal } = this.toothSelected;
    return (vestibular || ligual || distal || mesial || oclusal);
  }

  get getTitleModal() {
    return (this.isNew ? 'Agregar ': 'Editar ') + 'Servicio';
  }

  changeService(event: Event) {
    const idService = Number((event.target as HTMLSelectElement).value);
    this.toothSelected.id_service = idService;
    this.toothSelected.color = this.services.find(s => s.id_service === idService)?.color;
  }

  changeColor(section: ToothT, event: Event) {
    const value = (event.target as HTMLInputElement).checked;
    this.toothSelected[section] = value;
  }

}
