import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Parking } from '../models/parking';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NavGps } from '../models/nav-gps';
/**
 * constante representant un interval de 1 minute exprimé en ms
 */
const UPDATE_PARKING_INTERVAL=5000;
const SEARCH_RADIUS=5;
@Injectable({
  providedIn: 'root'
})
/**
 * service de recuperation des informations liés aux parkings et leurs disponibilités en temps réel
 */
export class ParkingService implements OnDestroy{
  /**
   * observable notifiant ses abbonnés à intervalle régulier
   */
  obs$ = interval(UPDATE_PARKING_INTERVAL);
    
  constructor(private http: HttpClient){
  }
  ngOnDestroy(): void {
    this.parkingsAround$.complete();
    this.parkingsAround$.unsubscribe();
  }
  // point GPS :
  navGPS?:NavGps;
  sparkApiUrl=environment.urlApi+"/api/parking";
  allParkings$=new BehaviorSubject<Parking[]>([]);
  parkingsAround$=new BehaviorSubject<Parking[]>([]);


  setNavGPS(navGPS:NavGps){
    this.navGPS=navGPS;
  }
  /**
   * fonction mettant à jour la liste des parkings a intervalle régulier
   */
  updateParkingList(){
    this.obs$.subscribe((v) =>{
      console.log("update Parking");
      console.log("nav GPS:"+ this.navGPS);
      console.log(v);
      if(this.navGPS)
      this.getParkingListAround(this.navGPS.localLat,this.navGPS.localLon,SEARCH_RADIUS);
    }
    );
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
    this.http.get<Parking[]>(this.sparkApiUrl+"/"+xLat+"/"+xLong+"/"+distance).subscribe((parkings) => {
      this.parkingsAround$.next(parkings);
    });

  }
}
