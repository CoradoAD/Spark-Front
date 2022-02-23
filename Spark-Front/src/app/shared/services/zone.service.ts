import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  constructor(private http: HttpClient) {}

  getAllZone(): Observable<Zone[]> {
    return this.http.get<Zone[]>(environment.apis.zone.url);
  }
}
