import { Injectable } from '@angular/core';
import { NavGps } from '../models/nav-gps';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  public navGPS!: NavGps;

  constructor( private mapServ: MapService ) {
    // Itinerary Service launched for test by 'ItineraryComponent'
  }

  /**
   * Set routing module
   * @param navGPS NavGps local & distant GPS localisation
   */
  setRouting(navGPS: NavGps) {
    this.mapServ.navGPS = navGPS;
    this.mapServ.needNav = true;
  }

  /**
   * Sync user location on nav itinerary (leaflet-routing-machine)
   * @param navGPS NavGps - actualised GPS info of user + same destination
   */
  syncGPSUserLoc(navGPS: NavGps){
    this.mapServ.syncNavGPS = navGPS;
  }
}
