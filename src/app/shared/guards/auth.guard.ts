import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthenticationService } from '@app/shared/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
    const expectedRole = next.data.expectedRole;
    const { role } = this.authService;
    if (!this.authService.isAuthenticated() || role !== expectedRole) {
      // not logged in so redirect to login page with the return url and return false
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
    return true;
  }

}
