import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Vehicle } from '../models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  // public loadUserVehicle(user : User) {
  //   this.http
  //     .get<Vehicle>(environment.apis.vehicle.url)
  //     .subscribe(vehicle => {

  //     });
  // }
}
