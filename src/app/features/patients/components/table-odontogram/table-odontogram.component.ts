import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import Swal from 'sweetalert2';

import { RecordService } from '@services/record.service';

import { Tooth } from '@models/tooth.model';

import { StatusRecordService } from '@enums/status-record.enum';

@Component({
  selector: 'app-table-odontogram',
  templateUrl: './table-odontogram.component.html',
  styles: [
  ]
})
export class TableOdontogramComponent implements OnInit, OnChanges {

  @Input() teeth: Tooth[];

  constructor(
    private recordService: RecordService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.teeth = changes['teeth'].currentValue;
  }

  ngOnInit(): void {
  }

  serviceDone(id_record: number | undefined) {
    this.recordService.changeStatus(Number(id_record), StatusRecordService.DONE);
  }

  serviceCancelled(id_record: number | undefined, service: string | undefined) {
    Swal.fire({
      title: `¿Estás seguro de cancelar este servicio?`,
      text: `'${service}'`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.recordService.changeStatus(Number(id_record), StatusRecordService.CANCEL);
      }
    })
  }

}
