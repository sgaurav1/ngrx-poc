import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ROUTES } from '../utilities/routes';
// import { AuthService } from './services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  routes = ROUTES;
  constructor(private store: Store, private router: Router) { }
  isLoggedIn: boolean = false
  role: string = '';
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.subscribe({
      next: (res: any) => {
        if (res.auth && res.auth.user !== undefined) {
          console.log('res data', res);
          this.isLoggedIn = true
          this.role = res.auth.user.role
        }
      }
    })
    let url: string = state.url;
    return this.checkUserLogin(next, url);
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(next, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.isLoggedIn) {
      console.log(route);
      if (route.data['role'] && route.data['role'].indexOf(this.role) === -1) {
        this.router.navigate(['/auth/login']);
        return false;
      }
      return true;
    }
    this.router.navigate(['/auth/login']);
    return false;
  }

}
