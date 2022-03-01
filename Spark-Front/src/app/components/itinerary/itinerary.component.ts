import { Component } from '@angular/core';
import { NavGps } from 'src/app/shared/models/nav-gps';
import { GpsNavSimu } from 'src/app/shared/models/test/gps-nav-simu';
import { ItineraryService } from 'src/app/shared/services/itinerary.service';
import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent {
  private navGPS!: NavGps;
  // test
  public simuNavGPS?: NavGps[];
  public gpsNavSimu?: GpsNavSimu;
  private navCounter = 0;
  private simul:boolean=false;;
  showPopup! : boolean;
  
  // --◊

  constructor(private itineraryServ: ItineraryService, private mapServ :MapService) {
    if(this.simul){this.testNavSimulation();}
    else{
      console.log("itinerary");
      var lat=43.58895;
      var lon=3.93254;
      this.navGPS = {
        localLat: lat,
        localLon: lon,
        distLat: 43.61424,
        distLon: 3.87117,
      };
      this.syncGPSUserLoc(this.navGPS);
      if(navigator.geolocation){
      
        navigator.geolocation.getCurrentPosition((position)=>{
        
          console.log(position.coords.latitude)
          console.log(position.coords.longitude)
          
          if( this.navGPS){
            this.navGPS.localLat = position.coords.latitude;
          this.navGPS.localLon = position.coords.longitude;
        }});
      }
        else{
          alert("Vous devez activer la géolocalisation!");
        }
    
      this.setRouting(this.navGPS);
    }
  }

  /**
   * Set routing module
   * @param navGPS NavGps local & distant GPS localisation
   */
   setRouting(navGPS: NavGps) {
    this.mapServ.navGPS = this.navGPS;
  }

  /**
   * Sync user location on nav itinerary (leaflet-routing-machine)
   * @param navGPS NavGps - actualised GPS info of user
   */
  syncGPSUserLoc(navGPS: NavGps){
   
    this.mapServ.syncNavGPS = navGPS;
  }

  /**
   * create simulated itinerary with fictive user for test purpose
   */
  testNavSimulation() {
    // set array of navGPS for simulate mouvement
    this.gpsNavSimu = {
      journeyName: 'Way too happy !',
      journeyNavSimu: [
        // Start: 43.55769, 4.08664 43.55863, 4.08579  43.55923, 4.08425  43.55993, 4.08252  43.56182, 4.08107  43.56306, 4.08025  43.5683, 4.07895  43.57037, 4.07678  43.56676, 4.06004  43.56134, 4.03568  43.55689, 4.01686  43.55443,4.00713  43.55166, 3.9903
        // 43.55091, 3.98857  43.54996, 3.98201  43.54782, 3.97932  43.54697, 3.9789  43.54632, 3.97852  43.54671, 3.97948  43.54647, 3.98094  43.54565, 3.98145  End: 43.54508, 3.9818
        this.navGPS = {localLat: 43.55769, localLon: 4.08664, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.55863, localLon: 4.08579, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.55923, localLon: 4.08425, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.55993, localLon: 4.08252, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.56182, localLon: 4.08107, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.56306, localLon: 4.08025, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.5683, localLon: 4.07895, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.57037, localLon: 4.07678, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.56676, localLon: 4.06004, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.56134, localLon: 4.03568, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.55689, localLon: 4.01686, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.55443, localLon: 4.00713, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.55166, localLon: 3.9903, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.55091, localLon: 3.98857, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.54996, localLon: 3.98201, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.54782, localLon: 3.97932, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.54697, localLon: 3.9789, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.54632, localLon: 3.97852, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.54671, localLon: 3.97948, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.54647, localLon: 3.98094, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.54565, localLon: 3.98145, distLat: 43.54508, distLon: 3.9818},
        this.navGPS = {localLat: 43.54508, localLon: 3.9818, distLat: 43.54508, distLon: 3.9818},
      ]
    }

    console.log(this.gpsNavSimu.journeyNavSimu[0]);
    // set routing
    this.itineraryServ.setRouting(this.gpsNavSimu.journeyNavSimu[21]);
    console.log('Default navCounter :' + this.navCounter);
    // initial update of user GPS localisation
    this.itineraryServ.syncGPSUserLoc(
      this.gpsNavSimu!.journeyNavSimu[this.navCounter]
    );
    // update user localisation
    setInterval(() => {
      this.itineraryServ.syncGPSUserLoc(
        this.gpsNavSimu!.journeyNavSimu[this.navCounter]
      );
      this.navCounter++;

      if (this.navCounter == this.gpsNavSimu!.journeyNavSimu.length) {

        setTimeout(() => {
          this.showPopup = true;
        }, 2000);
      }

      console.log('Updated navCounter :' + this.navCounter);
    }, 1300);

  }
}
