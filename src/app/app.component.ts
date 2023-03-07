import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Smart Dental';

  removeToggled() {
    const wrapper = document.querySelector('.wrapper');
    wrapper?.classList.remove('toggled');
  }
}
