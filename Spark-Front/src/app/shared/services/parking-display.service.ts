// -- Gestion des services liant les parkings et leur affichage sur la 'map' -- //
// Ex: logique de sélection d'icone par type de parking...
import { Injectable } from '@angular/core';
import { Map } from 'leaflet';
import { Parking } from '../models/parking';
import * as L from "leaflet";

@Injectable({
  providedIn: 'root'
})
export class ParkingDisplayService {
  
  map!: Map;
  parkIcon? : L.Icon;
  constructor() { }

  addParkingOnMap(parking: Parking){
    L.marker([parking.Xlong, parking.Ylat], {icon: this.parkIcon}).addTo(this.map);
  }

  getParkingIcon(){
    if(!this.parkIcon){}
  this.parkIcon= L.icon({
      iconUrl: IconPath.PARKICONPATH,
      shadowUrl: 'leaf-shadow.png',  
      iconSize:     [38, 95], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
     // shadowAnchor: [4, 62],  // the same for the shadow
     // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  });

  return this.parkIcon;
  }
}

enum IconPath{
  PARKICONPATH ="assets/parking/spark_park.svg"
}
  
  
