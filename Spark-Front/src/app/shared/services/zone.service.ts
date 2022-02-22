import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Parking } from '../models/parking';
import { environment } from 'src/environments/environment';
import { Zone } from '../models/zone';

@Injectable({
  providedIn: 'root',
})
export class ZoneService {
  zoneArray!: Zone[];
  zone!: Zone;

  constructor(private httpClient: HttpClient) {}

  getAllZone(): Observable<Zone[]> {
    return this.httpClient.get<Zone[]>(environment.apis.zone.url);
  }

  findZoneDetailsByParking(parking: Parking): Zone {
    this.getAllZone().subscribe(
      (arrayResult) => (this.zoneArray = arrayResult)
    );

    this.zoneArray.forEach((zone) => {
      if (zone.nom == parking.nom) {
        this.zone = zone;
      }
    });
    return this.zone;
  }
}
