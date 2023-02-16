import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router, private cookieService: CookieService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const role = this.cookieService.get('role');
    if (!role) {
      this.router.navigate(['/login']);
      return false;
    }
    if (route.data['roles'] && route.data['roles'].indexOf(role) === -1) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
