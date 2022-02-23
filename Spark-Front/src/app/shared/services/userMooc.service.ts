import { Injectable } from '@angular/core';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { User } from '../models/userMooc';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUser$ = new BehaviorSubject<User|null>(null);

  constructor(private http: HttpClient) {}

  public findAll(): Observable<User[]> {
    return this.http.get<User[]>(environment.apis.users.url);
  }

  public findOne() : Observable<User> {
    return this.http.get<User>(environment.apis.users.url).pipe(first());
  }

  public selectUser(user: User) {
    this.currentUser$.next(user);
  }
}
