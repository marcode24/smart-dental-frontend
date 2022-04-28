import { Component, Input, OnInit } from '@angular/core';

import { Record } from '@models/record.model';

@Component({
  selector: 'app-table-record',
  templateUrl: './table-record.component.html',
  styles: [
  ]
})
export class TableRecordComponent implements OnInit {

  @Input() records: Record[]

  constructor() { }

  ngOnInit(): void {
  }

}
