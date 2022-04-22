import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styles: [
  ]
})
export class InputSearchComponent implements OnInit {

  private textChanged: Subject<string> = new Subject<string>();
  @Input() findName: string;
  @Output() text: EventEmitter<string> = new EventEmitter<string>();
  constructor() {
    this.textChanged.pipe(debounceTime(300)).subscribe(title => this.emitText(title));
  }

  ngOnInit(): void {
  }

  changeText(text: string) {
    this.textChanged.next(text.trim());
  }

  emitText(text: string) {
    this.text.emit(text.trim());
  }
}
