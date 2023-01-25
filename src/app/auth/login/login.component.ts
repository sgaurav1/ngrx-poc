import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ERRORMESSAES } from '../../utilities/messages';
import { AuthService } from '../services/auth.service';
import { concatMap, delay, distinctUntilChanged, filter, forkJoin, from, map, mergeMap, Observable, switchMap, tap, toArray } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Store } from "@ngrx/store";
import { loginAction } from '../actions/auth.actions';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { ROUTES } from '../../utilities/routes';
import { AuthActions } from '../actions/auction-types';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  // *********** global variables *************
  routes = ROUTES;
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  errorsMessages = ERRORMESSAES;
  userData: any;
  formPreData: any;

  // *********** global variables end*************


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private http: HttpClient,
    private store: Store,
    private router: Router
  ) { }

  values = [
    {
      name: "John",
      age: 30
    },
    {
      name: "alex",
      age: 40
    }
  ];

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
      role: ['ROLE_ADMIN']
    })

    // patch value if pre value is available
    const formdata: any = sessionStorage.getItem('loginformval');
    if (formdata && formdata !== '') {
      this.formPreData = JSON.parse(formdata);
      console.log('formPredata: ', this.formPreData);
      this.loginForm.patchValue(this.formPreData)
    }

    this.loginForm.valueChanges
      // .pipe(distinctUntilChanged((prev, curr) => prev.name === curr.na))
      .subscribe(
        {
          next: (values) => {
            console.log(values);
            sessionStorage.setItem('loginformval', JSON.stringify(values));
          }
        }
      )

    // *****************************************************************
    // ============== multiple inner subscriptions ====================

    // const loginData = { email: "gtest@yopmail.com", password: 123456 }
    // this.auth.getFormData()
    // .pipe(
    //   filter((item:any,index)=> item[index].userId == 1),
    //   mergeMap((data:any)=>{
    //     console.log('mergeMap 1',data);
    //     return this.auth.getPostByUser(data[0].userId).pipe(
    //       mergeMap((data:any)=> {
    //         console.log('second mergeMap',data);
    //         return this.auth.getCommentByPost(data.userId);
    //       })
    //     )
    //   }),
    // )
    // .subscribe(
    //   {
    //     next: (data:any)=> {
    //       // this.userData = data.filter((item:any) => item['email'] == loginData.email && item['password'] === loginData.password);
    //       console.log(data);
    //     },
    //     complete: ()=>{
    //       // this.loginForm.patchValue(this.userData[0])
    //     }
    //   }
    // )

    // ***************
    // userdata=>post(from particular userId),allPosts,comments(of particular postId)
    // this.auth.getFormData()
    //   .pipe(
    //     mergeMap((user: any) => {
    //       console.log('user data: ', user);
    //       return forkJoin([
    //         this.auth.getPostByUser(user[0].userId),//postById
    //         this.auth.getPosts(),//allposts
    //         this.auth.getPostByUser(user[0].userId).pipe(
    //           mergeMap((data: any) => {
    //             console.log('inner data', data);
    //             return this.auth.getComments(data['id'])//comments of postId
    //           })
    //         )]);
    //       // ================ 
    //     })
    //   )
    //   .subscribe({
    //     next: (data) => {
    //       console.log('final data: ', data)
    //     }
    //   })


    // *************************************************************************************
    // =============================== MULTIPLE INNER SUBSCRIPTIONS END =======================

  }


  get f() {
    console.log(this.loginForm.controls);
    return this.loginForm.controls;
  }

  signIn() {
    this.isSubmitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    console.log('formcalue', this.loginForm.value);
    // 
    // this.auth.login(1)
    //   .pipe(
    //     tap((user:any) => {
    //       this.store.dispatch(AuthActions.loginAction(this.loginForm.value));
    //       this.router.navigateByUrl(this.routes.home)
    //       console.log(user);
    //   })
    //   )
    //   .subscribe({
    //     next: (res) => {
    //       console.log('response: ', res)
    //       // this.auth.checkIsLoggedIn();
    //     }
    //   })
    this.store.dispatch(AuthActions.loginAction({ user: this.loginForm.value }));
    if(this.auth.getRole() === 'ROLE_ADMIN'){
      this.router.navigateByUrl(this.routes.home)
    }
    if(this.auth.getRole() === 'ROLE_USER'){
      this.router.navigateByUrl(this.routes.user)
    }
  }
  

  signup() {
    this.router.navigateByUrl(this.routes.signup);
  }

  saveFormData() {

  }



}
