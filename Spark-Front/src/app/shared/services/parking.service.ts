import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Parking } from '../models/parking';
import { interval } from 'rxjs';
import { environment } from 'src/environments/environment';
/**
 * constante representant un interval de 1 minute exprimé en ms
 */
const UPDATE_PARKING_INTERVAL=1000*60;
@Injectable({
  providedIn: 'root'
})
/**
 * service de recuperation des informations liés aux parkings et leurs disponibilités en temps réel
 */
export class ParkingService {
  /**
   * observable notifiant ses abbonnés à intervalle régulier
   */
 obs$ = interval(UPDATE_PARKING_INTERVAL);

  constructor(private http: HttpClient){
  }

  sparkApiUrl=environment.urlApi+"/api/parking";
  allParkings$=new BehaviorSubject<Parking[]>([]);
  parkingsAround$=new BehaviorSubject<Parking[]>([]);

  /**
   * fonction mettant à jour la liste des parkings a intervalle régulier
   */
  updateParkingList(){
    this.obs$.subscribe((v) =>this.getParkingList());
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
   * Récupère la liste des parkings dans un rayon donné  autour d'un point donné  defini par ses coordonnées GPS
   * Non developpé encore !!
   */
  getParkingListAround(xLong:number,xLat:number,distance:number){
    this.http.get<Parking[]>(this.sparkApiUrl).subscribe((parkings) => {
      this.parkingsAround$.next(parkings);
    });

  }
}
