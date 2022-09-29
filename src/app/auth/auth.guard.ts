import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { ROUTES } from '../utilities/routes';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  routes = ROUTES;
  constructor(private store: Store, private router: Router) { }
  isLoggedIn: boolean = false
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.store.subscribe({
      next: (res: any) => {
        if (res.auth && res.auth.user !== undefined) {
          console.log('res data', res);
          this.isLoggedIn = true
        }
      }
    })
    if (!this.isLoggedIn) {
      this.router.navigate(['/auth/login'])
    }
    return true
  }

}
