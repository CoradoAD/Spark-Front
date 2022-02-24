import { Injectable, Output,EventEmitter } from '@angular/core';
import { Map, Marker } from 'leaflet';
import { Parking } from '../models/parking';
import * as L from "leaflet";
import { BehaviorSubject } from 'rxjs';

const PARKING_ICON_SIZE=20;

@Injectable({
  providedIn: 'root'
})
/**
 * Service permettant de gerer l'affichage des parkings sur la carte
 */
export class ParkingDisplayService {  
  map!: Map;
  parkIcon? : L.Icon;
  selectedParking$=new BehaviorSubject<Parking|undefined>(undefined);  
  layer?:L.LayerGroup;
  constructor() { 

    this.layer=new L.LayerGroup();
  }


  createLayerGroup(){
    var layer=L.layerGroup();
    layer.addLayer(L.marker([23,56]))
  }
  /**
   * Ajoute une icone representant un parking sur la carte
   * @param parking 
   */
  addParkingOnMap(parking: Parking){   
    console.log("addParkingOnMap"); 
    
    const marker=L.marker([parking.Ylat, parking.Xlong], {icon: this.getParkingIcon()})
    .on('click', ()=>{
      alert(parking.nom+" "+parking.freeCapacity);  // popup de test a supprimmer    
      this.selectedParking$.next(parking)})
    .addTo(this.map);  
    
  }
  /**
   * crée et retourne l'icone pour un parking
   * @returns 
   */
  getParkingIcon():L.Icon{
    if(!this.parkIcon){      
        this.parkIcon= L.icon({
        iconUrl: IconPath.PARKICONPATH,        
        iconSize:     [PARKING_ICON_SIZE, PARKING_ICON_SIZE], // size of the icon
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
  
  
