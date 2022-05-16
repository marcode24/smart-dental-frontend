import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styles: [
  ]
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() limit: number = 0;
  @Input() total: number = 0;

  @Output() changedOffset: EventEmitter<number> = new EventEmitter();

  private offset: number = 0;
  public pageActive: number = 1;
  public totalPages: number = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.limit = (changes['limit'] && changes['limit'].currentValue) || 5;
    this.pageActive = 1;
    this.getPages();
  }

  ngOnInit(): void {
    this.getPages();
  }

  getPages() {
    this.totalPages = this.getTotalPages;
  }

  get getTotalPages(): number {
    return Math.ceil(this.total / this.limit);
  }

  changePage(value: number) {
    this.pageActive += (value > 0) ? 1 : -1;
    this.offset += value;
    if (this.offset < 0) {
      this.offset = 0;
      this.pageActive = 1;
    } else if (this.offset >= this.total) {
      this.offset -= value;
      this.pageActive = this.getTotalPages;
    }
    this.changedOffset.emit(this.offset);
  }

}
