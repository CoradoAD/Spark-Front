import { Injectable } from '@angular/core';
// 'leaflet' imports
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Injectable({
  providedIn: 'root'
})
export class MapRoutingService extends L.Routing.ItineraryBuilder {

  constructor() {
    super();
  }

}
