import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { ENDPOINTS } from 'src/config';
import { select, Store } from "@ngrx/store";
import { isLoggedIn,isLoggedOut } from '../selectors/auth.selectors';
// import {Store} from 'ngrx/store';
import{ BehaviorSubject, Observable} from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endPoints = ENDPOINTS;
  // userIsLoggedIn = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient, private store: Store) { }

  login(id:number){
    // login statements
    return this.http.get(`${this.endPoints.user}/${id}`);
  }
  logOut(){
    //logput statements 
  }

  // checkIsLoggedIn(){
  //   this.store.subscribe(
  //     {
  //       next: (res:any)=>{
  //         if(res.auth){
  //           this.userIsLoggedIn.next(true);
  //         }
  //       }
  //     }
  //   )
  // }
}
