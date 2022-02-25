import { Injectable } from '@angular/core';
import { NavGps } from '../models/nav-gps';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  public navGPS!: NavGps;

  constructor( private mapServ: MapService ) {
    console.log('Itinerary Component constructor');
    // Test routing (test values) 43.58895, 3.93254 RP1 Latte // 43.59117, 3.93619 // 43.6101, 3.8918 Jean Mermoz // 43.56217, 4.07966  LGM
    // this.navGPS = {
    //   localLat: 43.59117,
    //   localLon: 3.93619,
    //   distLat: 43.61424,
    //   distLon: 3.87117,
    // };
    // console.log('navGPS by itinerary.com : ' + this.navGPS);

    // this.setRouting(this.navGPS);
    // this.syncGPSUserLoc(this.navGPS);
    // End test lat/long --◊
  }

  /**
   * Set routing module
   * @param navGPS NavGps local & distant GPS localisation
   */
  setRouting(navGPS: NavGps) {
    console.log('navGPS of itineraryService :' + navGPS);
    this.mapServ.navGPS = navGPS;
    this.mapServ.needNav = true;
  }

  /**
   * Sync user location on nav itinerary (leaflet-routing-machine)
   * @param navGPS NavGps - actualised GPS info of user + same destination
   */
  syncGPSUserLoc(navGPS: NavGps){
    // simulated updated user localisation
    // navGPS.localLat = 43.58895;
    // navGPS.localLon = 3.93254;
    // End initalisation of update --◊
    this.mapServ.syncNavGPS = navGPS;
  }
}
