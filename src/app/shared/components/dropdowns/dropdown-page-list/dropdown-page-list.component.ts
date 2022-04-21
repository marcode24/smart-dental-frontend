import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-page-list',
  templateUrl: './dropdown-page-list.component.html',
  styles: [
  ]
})
export class DropdownPageListComponent implements OnInit {

  @Output() limit: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  changeLimit(event: any) {
    const value: number = Number(event.target.value);
    this.limit.emit(Number(value));
  }

}
