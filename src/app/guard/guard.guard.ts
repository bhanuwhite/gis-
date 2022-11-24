import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GuardGuard implements CanActivate {
  token: any = sessionStorage.getItem('token');
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.token) {
      return true;
    } else {
      Notiflix.Notify.warning('Unauthorized Login');

      this.router.navigate(['/']);

      return false;
    }
  }
}
