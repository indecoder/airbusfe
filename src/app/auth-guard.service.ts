import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : boolean {
    if (localStorage.getItem('token')) {
      return state.url.startsWith('/inventory')
        ? true : (this.router.navigate(['/']), false);
    } else {
      return state.url.startsWith('/inventory')
        ? (this.router.navigate(['/']), false)
        : true;
    }
  }
}
