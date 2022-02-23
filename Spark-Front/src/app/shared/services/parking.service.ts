import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Parking } from '../models/parking';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  constructor(private http: HttpClient){

  }

  sparkApiUrl="http://localhost:8090/api/parking";
  allParkings$=new BehaviorSubject<Parking[]>([]);
  parkingsAround$=new BehaviorSubject<Parking[]>([]);


  /**
   * récupère la liste des parkings
   */
  getParkingList(){
    console.log("1.getParkingList");
    this.http.get<Parking[]>(this.sparkApiUrl).subscribe((parkings) => {
      console.log(parkings);
      this.allParkings$.next(parkings);
      
    });
   

  }

  /**
   * Récupère la liste des parkings dans un rayon donné  autour d'un point donné  defini par ses coordonnées GPS
   * 
   */
  getParkingListAround(xLong:number,xLat:number,distance:number){
    this.http.get<Parking[]>(this.sparkApiUrl).subscribe((parkings) => {
      this.parkingsAround$.next(parkings);
    });

  }

  
}
