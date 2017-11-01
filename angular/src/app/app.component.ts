import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MatMenuTrigger } from '@angular/material';

import { AuthManagerService } from './services/auth-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, public authManager: AuthManagerService) { }

  logout() {
    this.authManager.logout();
    this.router.navigate(['/auth']);
  }
}
