import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
const AUTH_API = 'http://localhost:8090/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenStorageService) {


  }
  public isLoggedIn$ = new ReplaySubject<boolean>(1);

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

  userIsconnected() {
    return this.http.get<boolean>(AUTH_API + 'connected', httpOptions)
      .pipe(
        tap(resp => {
          this.tokenService.getToken()
          this.isLoggedIn$.next(!!resp)
        }));
  }
}
