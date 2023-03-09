import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { ServiceOfferService } from '@services/service-offer.service';

import { Tooth } from '@models/tooth.model';

@Component({
  selector: 'app-odontogram',
  templateUrl: './odontogram.component.html',
  styles: [
  ]
})
export class OdontogramComponent implements OnChanges {

  @Input() teeth: Tooth[];
  public upSequence = [18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28];
  public downSequence = [48, 47, 46, 45, 44, 43, 42, 41, 31, 32, 33, 34, 35, 36, 37, 38];

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

  getServicesActive(tooth_number: number, position: 'up' | 'down') {
    this.toothTemp = (position === 'up')
      ? this.upTeeth.find(t => t.tooth_number === tooth_number)
      : this.downTeeth.find(t => t.tooth_number === tooth_number);
    this.serviceOfferServices.getServicesActive(true);
  }

  setData(teeth: Tooth[]) {
    this.loadDataTeeth();
    teeth.forEach((tooth: Tooth) => {
      const belongsUp = this.upSequence.includes(tooth.tooth_number);
      if(belongsUp) {
        this.upTeeth = this.upTeeth.map(upTooth => {
          return upTooth.tooth_number === tooth.tooth_number
            ? upTooth = { ...tooth, color: tooth.record?.service?.color }
            : upTooth;
        });
      } else {
        this.downTeeth = this.downTeeth.map(downTooth => {
          return downTooth.tooth_number === tooth.tooth_number
            ? downTooth = { ...tooth, color: tooth.record?.service?.color  }
            : downTooth;
        });
      }
    });
  }

  loadDataTeeth() {
    this.downTeeth = this.downSequence.map((num) => ({ tooth_number: num }));
    this.upTeeth = this.upSequence.map((num) => ({ tooth_number: num }));
  }
}
