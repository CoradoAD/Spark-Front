import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, find, Observable, retry, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/userMooc';


const API_URL = 'http://localhost:8080/api/test/';


@Injectable({
  providedIn: 'root',
})
export class UserService {


  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  updateUser(user: any) {
    return this.http
      .patch<User>( environment.apis.users.url + "/" + user.id , user)
  }

}
