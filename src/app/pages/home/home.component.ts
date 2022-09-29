import { Component, OnInit } from '@angular/core';
import { Router, ROUTER_CONFIGURATION } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions } from 'src/app/auth/actions/auction-types';
import {isLoggedIn, isLoggedOut} from '../../auth/selectors/auth.selectors';
import{ROUTES} from '../../utilities/routes';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn$! : Observable<boolean>;
  isLoggedOut$! : Observable<boolean>;
  routes = ROUTES
  userdata: any


  constructor(private store: Store, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(
      select(isLoggedIn)
    )
    this.isLoggedOut$ = this.store.pipe(
      select(isLoggedOut)
    )

    this.userService.getLoggeduser().then((data:any)=>{
      this.userdata = data;
      console.log('response data: ',this.userdata)
    })

  }

  logout(){
    this.store.dispatch(AuthActions.loginAction({user: undefined}));
    this.router.navigateByUrl(this.routes.login)
  }

}
