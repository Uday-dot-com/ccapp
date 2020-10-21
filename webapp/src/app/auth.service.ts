import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable()
export class AuthService{
path = 'http://localhost:3000/auth';

  constructor(private http: HttpClient){

  }

  get token(){
    return localStorage.getItem('token');
  }
  saveUser(data: any): Observable<any>{
return this.http.post(this.path + '/register', data);
  }

  userLogin(data: any): Observable<any>{
    return this.http.post(this.path + '/login', data);
      }
}
