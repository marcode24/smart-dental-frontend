import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dropdown-page-list',
  templateUrl: './dropdown-page-list.component.html',
  styles: [
  ]
})
export class DropdownPageListComponent {

  @Output() limit: EventEmitter<number> = new EventEmitter<number>();

  changeLimit(event: any) {
    const value = Number(event.target.value);
    this.limit.emit(Number(value));
  }

}
