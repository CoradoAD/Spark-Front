import { Component, OnInit } from '@angular/core';
import { NavGps } from 'src/app/shared/models/nav-gps';
import { MapService } from 'src/app/shared/services/map.service';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.scss']
})
export class ItineraryComponent implements OnInit {
  public navGPS!: NavGps;

  constructor( private mapServ: MapService ) {
    // Test routing (test values) 43.58895, 3.93254 RP1 Latte // 43.59117, 3.93619 // 43.6101, 3.8918 Jean Mermoz // 43.56217, 4.07966  LGM
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
        console.log("NAVIGATEUR EST DISPO!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        console.log("END COORDONN2ES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
         this.navGPS.localLat = position.coords.latitude;
         this.navGPS.localLon = position.coords.longitude;
       });
     }
      else{
        alert("pas de geoloc!");
      }
  
    this.setRouting(this.navGPS);
   
    // End test lat/long --◊
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
    // simulated updated user localisation
    // navGPS.localLat = 43.58895;
    // navGPS.localLon = 3.93254;
    // End initalisation of update --◊
    this.mapServ.syncNavGPS = navGPS;
  }

  ngOnInit(): void {
  }

}
