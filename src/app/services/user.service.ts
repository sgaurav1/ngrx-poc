import { Injectable } from '@angular/core';
import {Store} from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { ENDPOINTS } from 'src/config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  searchFilterPredata: any = null;
  filterOfTable: any = null;
  constructor(private store: Store, private http: HttpClient) { }

  getLoggeduser(){
    // statement
    // ngrx store statement
    return new Promise((resolve,reject)=>{
      this.store.subscribe({
        next: (res:any)=>{
          resolve(res.auth.user);
        },
        error: (err)=>{
          reject(err);
        }
      })
    })
  }

  getFormData(){
    return this.http.get('../assets/json/user.json');
  }
  getPostByUser(id:number){
    return this.http.get(`${ENDPOINTS.post}/${id}`);
  }
  getPosts(){
    return this.http.get(ENDPOINTS.post);
  }
  getCommentByPost(id:number){
    return this.http.get(`${ENDPOINTS.post}/${id}/comments`);
  }
  getComments(postId:number){
    return this.http.get(`${ENDPOINTS.comments}${postId}`);
  }


  setPredata(data:any){
    this.searchFilterPredata = data;
  }
  getPredata(){
    return this.searchFilterPredata;
  }


}
