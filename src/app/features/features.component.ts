import { Component, OnInit } from '@angular/core';

declare let customInitFunction:any;

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    customInitFunction();
  }

}
