import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Parking } from '../models/parking';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavGps } from '../models/nav-gps';

@Injectable({
  providedIn: 'root'
})
/**
 * service de recuperation des informations liés aux parkings et leurs disponibilités en temps réel
 */
export class ParkingService implements OnDestroy{


  constructor(private http: HttpClient){
  }
  ngOnDestroy(): void {
    this.parkingsAround$.complete();
    this.parkingsAround$.unsubscribe();
  }
  // point GPS :
  navGPS?:NavGps;
  sparkApiUrl=environment.apis.parking.url;
  allParkings$=new BehaviorSubject<Parking[]>([]);
  parkingsAround$=new BehaviorSubject<Parking[]>([]);


  setNavGPS(navGPS:NavGps){
    this.navGPS=navGPS;
  }

  /**
   * récupère la liste des parkings
   */
  getParkingList(){
    this.http.get<Parking[]>(this.sparkApiUrl).subscribe((parkings) => {
      this.allParkings$.next(parkings);

    });
  }
 /**
  * Récupère la liste des parkings à une distance données autour d'un point origine donné ,
  * @param xLong  longitude du point origine
  * @param xLat  latitude du point origine
  * @param distance rayon de recherche du point origine
  */
  getParkingListAround(xLat:number,xLong:number,distance:number){
    console.log("getParkingListAround");
    console.log("xLat "+xLat);
    this.http.get<Parking[]>(this.sparkApiUrl+"/"+xLat+"/"+xLong+"/"+distance).subscribe((parkings) => {
      this.parkingsAround$.next(parkings);
    });

  }

  
}
