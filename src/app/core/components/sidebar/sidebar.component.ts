import { Component } from '@angular/core';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {
  private userActiveRole: string;
  private wrapper = document.querySelector('.wrapper');

  constructor(private authService: AuthService) {
    this.userActiveRole = this.authService.userActive.role;
  }

  mouseEnter() {
    this.wrapper?.classList.add('sidebar-hovered');
  }

  mouseLeave() {
    this.wrapper?.classList.remove('sidebar-hovered');
  }

  logout() {
    this.authService.logout();
  }

  get hasAccess(): boolean {
    return this.userActiveRole === 'ADMIN';
  }

  toggled() {
    const has = this.wrapper?.classList.contains('toggled');
    if(has) {
      this.wrapper?.classList.remove('toggled');
    } else {
      this.wrapper?.classList.add('toggled');
    }
  }

}
