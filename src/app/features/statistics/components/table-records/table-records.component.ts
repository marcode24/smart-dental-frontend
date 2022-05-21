import { Component, Input, OnInit } from '@angular/core';
import { Record } from '@models/record.model';

@Component({
  selector: 'app-table-records',
  templateUrl: './table-records.component.html',
  styles: [
  ]
})
export class TableRecordsComponent implements OnInit {

  @Input() records: Record[];

  constructor() { }

  ngOnInit(): void {
  }

}
