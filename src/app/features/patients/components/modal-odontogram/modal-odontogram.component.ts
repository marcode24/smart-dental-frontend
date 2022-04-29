import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { Service } from '@models/service.model';
import { Tooth } from '@models/tooth.model';

import { PatientService } from '@services/patient.service';
import { ServiceOfferService } from '@services/service-offer.service';
import { ToothService } from '@services/tooth.service';

@Component({
  selector: 'app-modal-odontogram',
  templateUrl: './modal-odontogram.component.html',
  styles: [
  ]
})
export class ModalOdontogramComponent implements OnInit, OnChanges, OnDestroy {

  @Input() tooth: Tooth | undefined;

  public toothSelected: Tooth;
  public isNew: boolean = true;
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
    this.servicesActive = this.serviceOfferService.servicesActive.subscribe(services => {
      this.services = services
      if(services.length > 0 && (!this.toothSelected.record || !this.tooth?.color)) {
        this.toothSelected.color = this.services[0].color;
        this.toothSelected.id_service = this.services[0].id_service;
      }
    });
  }

  saveTooth() {
    if(this.isNew) {
      const { vestibular, ligual, distal, mesial, oclusal } = this.toothSelected;
      if(vestibular || ligual || distal || mesial || oclusal) {
        const newTooth: Tooth = {
          id_service: this.toothSelected.id_service,
          tooth_number: this.toothSelected.tooth_number,
          vestibular: this.toothSelected.vestibular || false,
          ligual: this.toothSelected.ligual || false,
          distal: this.toothSelected.distal || false,
          mesial: this.toothSelected.mesial || false,
          oclusal: this.toothSelected.oclusal || false,
          id_patient: this.patientIdActive,
        }
        this.toothService.create(newTooth);
      }
    } else {
      console.log('actualiza');
    }
  }

  get getTitleModal() {
    return (this.isNew ? 'Agregar ': 'Editar ') + 'Servicio';
  }

  changeService(event: any) {
    const idService: number = Number(event.value);
    this.toothSelected.id_service = idService;
    this.toothSelected.color = this.services.find(s => s.id_service === idService)?.color;
  }

  changeColor(section: 'vestibular' | 'ligual' | 'oclusal' | 'distal' | 'mesial', event: any) {
    const value = event.checked;
    switch (section) {
      case 'vestibular':
        this.toothSelected.vestibular = value;
        break;
      case 'ligual':
        this.toothSelected.ligual = value;
        break;
      case 'oclusal':
        this.toothSelected.oclusal = value;
        break;
      case 'distal':
        this.toothSelected.distal = value;
        break;
      case 'mesial':
        this.toothSelected.mesial = value;
        break;
      default:
        return;
    }
  }

}
