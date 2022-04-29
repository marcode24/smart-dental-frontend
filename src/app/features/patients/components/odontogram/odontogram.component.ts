import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Tooth } from '@models/tooth.model';
import { ServiceOfferService } from '@services/service-offer.service';

@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styles: [
  ]
})
export class OdontogramComponent implements OnInit, OnChanges {

  @Input() teeth: Tooth[];
  public up: Array<number> = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  public down: Array<number> = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

  public upTeeth: Tooth[];
  public downTeeth: Tooth[];

  public toothTemp: Tooth | undefined;

  constructor(
    private serviceOfferServices: ServiceOfferService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    const teeth = changes['teeth'].currentValue;
    if(teeth) {
      this.setData(teeth);
    }
  }

  ngOnInit(): void {
  }

  getServicesActive(tooth_number: number, position: 'up' | 'down') {
    this.toothTemp = (position === 'up') ? this.upTeeth.find(t => t.tooth_number === tooth_number): this.downTeeth.find(t => t.tooth_number === tooth_number);
    this.serviceOfferServices.getServicesActive(true);
  }

  setData(teeth: Tooth[]) {
    this.loadDataTeeth();
    teeth.forEach((tooth: Tooth) => {
      const belongsUp = this.up.includes(tooth.tooth_number);
      const belongsDown = this.down.includes(tooth.tooth_number);
      if(belongsUp) {
        this.upTeeth.map(t => {
          if (t.tooth_number === tooth.tooth_number) {
            const { distal, ligual, mesial, oclusal, vestibular, record, id_tooth } = tooth;
            t.id_tooth = id_tooth;
            t.distal = distal;
            t.ligual = ligual;
            t.mesial = mesial;
            t.oclusal = oclusal;
            t.vestibular= vestibular;
            t.record = record;
            t.color = record?.service?.color;
          }
        });
      }
      if(belongsDown) {
        this.downTeeth.map(t => {
          if (t.tooth_number === tooth.tooth_number) {
            const { distal, ligual, mesial, oclusal, vestibular, record, id_tooth } = tooth;
            t.id_tooth = id_tooth
            t.distal = distal;
            t.ligual = ligual;
            t.mesial = mesial;
            t.oclusal = oclusal;
            t.vestibular= vestibular;
            t.record = record;
            t.color = record?.service?.color;
          }
        });
      }
    });
  }

  loadDataTeeth() {
    this.downTeeth = [
      { tooth_number: 48 },
      { tooth_number: 47 },
      { tooth_number: 46 },
      { tooth_number: 45 },
      { tooth_number: 44 },
      { tooth_number: 43 },
      { tooth_number: 42 },
      { tooth_number: 41 },
      { tooth_number: 31 },
      { tooth_number: 32 },
      { tooth_number: 33 },
      { tooth_number: 34 },
      { tooth_number: 35 },
      { tooth_number: 36 },
      { tooth_number: 37 },
      { tooth_number: 38 }
    ];
    this.upTeeth = [
      { tooth_number: 18 },
      { tooth_number: 17 },
      { tooth_number: 16 },
      { tooth_number: 15 },
      { tooth_number: 14 },
      { tooth_number: 13 },
      { tooth_number: 12 },
      { tooth_number: 11 },
      { tooth_number: 21 },
      { tooth_number: 22 },
      { tooth_number: 23 },
      { tooth_number: 24 },
      { tooth_number: 25 },
      { tooth_number: 26 },
      { tooth_number: 27 },
      { tooth_number: 28 }
    ];
  }
}
