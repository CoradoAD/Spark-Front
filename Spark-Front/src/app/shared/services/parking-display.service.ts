import { Injectable } from '@angular/core';
import { Map } from 'leaflet';
import { Parking } from '../models/parking';
import * as L from "leaflet";

@Injectable({
  providedIn: 'root'
})
/**
 * Service permettant de gerer l'affichage des parkings sur la carte
 */
export class ParkingDisplayService {
  
  map!: Map;
  parkIcon? : L.Icon;
  constructor() { }
  /**
   * Ajoute une icone representant un parking sur la carte
   * @param parking 
   */
  addParkingOnMap(parking: Parking){
    console.log(parking.Ylat);
    L.marker([parking.Ylat, parking.Xlong], {icon: this.getParkingIcon()}).addTo(this.map);
    
  }
  /**
   * crée et retourne l'icone pour un parking
   * @returns 
   */
  getParkingIcon():L.Icon{
    if(!this.parkIcon){      
      this.parkIcon= L.icon({
      iconUrl: IconPath.PARKICONPATH,        
      iconSize:     [20, 20], // size of the icon
      // shadowSize:   [50, 64], // size of the shadow
      // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
     // shadowAnchor: [4, 62],  // the same for the shadow
     // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });  
    
  }
  return this.parkIcon;
  }
}
/**
 * enumeration spécifiant les url des icones representant les différents types de parkings
 */
enum IconPath{
  PARKICONPATH ="assets/parking/spark_park.svg"
}
  
  
