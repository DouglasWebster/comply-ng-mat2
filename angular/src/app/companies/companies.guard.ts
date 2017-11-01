import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthManagerService } from '../services/index';

@Injectable()
export class CompaniesGuard implements CanActivate {

  constructor(private authService: AuthManagerService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isAuthenticated()) { return true; }

    // Navigate to the login page with extras
    this.router.navigate(['/auth']);
    return false;
  }
}
