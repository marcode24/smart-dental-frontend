import { Component, Input, OnInit } from '@angular/core';

import { StatusRecordService } from '@enums/status-record.enum';

import { Record } from '@models/record.model';

import { RecordService } from '@services/record.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styles: [
  ]
})
export class TableRecordComponent implements OnInit {

  @Input() records: Record[]
  @Input() isHome: boolean = true;

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit(): void {
  }

  serviceDone(id_record: number) {
    this.recordService.changeStatus(id_record, StatusRecordService.DONE);
  }

  servicePaid(id_record: number) {
    this.recordService.changeStatus(id_record, StatusRecordService.PAID);
  }

  serviceCancelled(id_record: number, service: string) {
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
        this.recordService.changeStatus(id_record, StatusRecordService.CANCEL);
      }
    })
  }

}
