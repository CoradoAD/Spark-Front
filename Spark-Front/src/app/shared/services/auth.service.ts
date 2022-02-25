import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  public isLoggedIns$ = new ReplaySubject<boolean>(1);

  login(username: string, userPwd: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      userPwd
    }, httpOptions);
  }

  register(username: string, userEmail: string, userPwd: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      userEmail,
      userPwd
    }, httpOptions);
  }
}
