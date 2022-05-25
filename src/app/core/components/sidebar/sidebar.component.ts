import { Component, OnInit } from '@angular/core';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit {

  private userActiveRole: string;

  constructor(private authService: AuthService) {
    this.userActiveRole = this.authService.userActive.role;
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  get hasAccess(): boolean {
    return this.userActiveRole === 'ADMIN';
  }

}
