// -- Gestion des services liés à 'map-component' et à la map (OpenStreetMap, etc.) en 'local' -- //
import { EventEmitter, Injectable, Output } from '@angular/core';
import * as L from 'leaflet';
import { latLng, Map, tileLayer } from 'leaflet';
import { NavGps } from '../models/nav-gps';
import 'leaflet-routing-machine';
import { ParkingDisplayService } from './parking-display.service';
import { ParkingService } from './parking.service';
import { BehaviorSubject, interval, Subscription } from 'rxjs';
import { Parking } from '../models/parking';
import { NgLocalization } from '@angular/common';

/**
 * constante representant un interval de 1 minute exprimé en ms
 */
 const UPDATE_PARKING_INTERVAL=5000;
 const SEARCH_RADIUS=50;
@Injectable({
  providedIn: 'root'
})
export class MapService {
  public navGPS!: NavGps;
  public syncNavGPS!: NavGps;
  public map!: Map;
  public zoom!: number;
  public options!: L.MapOptions;
  private routingMachineIsRunning = false;
  public routeControl?: L.Routing.Control;
  sub:Subscription |null=null;
  parkings: Parking[] =[];
  /**
   * parking selectionné lorsque l'on clique sur la carte
   */
  selectedParking:Parking|undefined;
 
   /**
   * observable notifiant ses abbonnés à intervalle régulier
   */
    obs$ = interval(UPDATE_PARKING_INTERVAL);
  receiveMap(map: Map) {
    this.map = map;
  }

  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }
  @Output() map$: EventEmitter<L.Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;

  /**
   * Set general option for 'leaflet' map
   * @returns 'leaflet' L.MapOption
   */
  setMapOptions(): L.MapOptions {
    this.options = {
      layers:[tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 21,
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })],
      zoom:1,
      center:latLng(43.61424,3.87117, 14)
    };
    return this.options;
  }

  constructor(private parkingDisplayService: ParkingDisplayService, private parkingService:ParkingService) { }

  /**
   * Initiate Routing (itinerary) service/module
   * With local and distant GPS points
   * (To convert address into GPS point, use 'leaflet geocoder')
   * @param navGPS NavGps - set local LatLon & dist LatLon
   */
  setRouting(navGPS: NavGps) {
    this.routingModule(navGPS.localLat, navGPS.localLon, navGPS.distLat, navGPS.distLon);
    setInterval(() => this.syncGPSUserLoc(this.syncNavGPS), 5000)
    this.parkingService.setNavGPS(this.syncNavGPS);
  }
  /**
   * Sync user location on nav itinerary (leaflet-routing-machine)
   * @param navGPS NavGps - actualised GPS info of user
   */
   syncGPSUserLoc(navGPS: NavGps) {
    var newLatLngA = new L.LatLng(navGPS.localLat, navGPS.localLon);
    var newLatLngB = new L.LatLng(navGPS.distLat, navGPS.distLon);
    this.routeControl!.setWaypoints([newLatLngA, newLatLngB]);
  }
  /**
   * 'Leaflet' method that runs when the map is ready
   * @param map L.Map
   */
  MapReady(map: L.Map, navNeed?: boolean, navGPS?: NavGps) {
    this.parkingDisplayService.map=map;
    this.sub = this.parkingService.parkingsAround$.subscribe((parkings) => {  
     this.parkings = parkings;
     this.initParkingWiew();      
    });
    this.updateParkingList();
    this.parkingDisplayService.selectedParking$.subscribe((parking) => {  
      this.selectedParking=parking; 
    });
    this.map = map;
    this.map$.emit(map);
    map.setView([43.61424, 3.87117], 16).on("click",()=>{
          if(this.routingMachineIsRunning)      
          {
            this.stopNavigation();
          }
        }); // Set variables for init map
    this.zoom = map.getZoom();
    //suppression du prefix leaflet
    map.attributionControl.setPrefix('');
    //suppression de l'attribution en bas de page @OpenStreetMap
    this.map.on('locationfound', (e)=>{
     console.log("locationFound");
      var radius = 10;
      var location = e.latlng;
      L.marker(location).addTo(this.map)
      L.circle(location, radius).addTo(map);
      this.map.setView( e.latlng);
    });
    this.map.on('locationerror', (e)=>{
      console.log("Géolocalisation non disponible");
    });
    map.locate();
    map.attributionControl.remove();
    this.zoom$.emit(this.zoom);
  
  }

 
  /**
   * methode appelée afin de lancer la navigation vers un parking
   */
  startNavigation(parking:Parking){
    this.stopNavigation()
    console.log("start navigation");
    this.navGPS.distLat=parking.Ylat;   
    this.navGPS.distLon=parking.Xlong; 
   if(!this.routingMachineIsRunning) this.setRouting(this.navGPS);
   
  }
  /**
   * méthode permmetant d'arrêter la navigation
   */
  stopNavigation(){
    
    if(this.routeControl&&this.routingMachineIsRunning){
      this.map.removeControl(this.routeControl);
      this.routingMachineIsRunning=false;
    }
  }
  
  /**
   * affiche  tous les parkings sur la carte
   */
   initParkingWiew(){
    console.log("init Parking view");   
    this.parkingDisplayService.removeParkingsFromMap(); 
    this.parkings.forEach(parking => {       
      this.parkingDisplayService.addParkingOnMap(parking);
    });
  }

  /**
   * fonction mettant à jour la liste des parkings a intervalle régulier
   */
   updateParkingList(){
    this.obs$.subscribe((v) =>{
      console.log("update Parking");
      console.log(v);
      if(this.syncNavGPS){
        this.parkingService.getParkingListAround(this.syncNavGPS.localLat,this.syncNavGPS.localLon,SEARCH_RADIUS);
      }
      
    }
    );
  }

  /**
   * 'Leaflet' method managing the zoom of the map
   * @param e ZoomAnimEvent
   */
  onMapZoomEnd(e: L.ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

  /**
  * 'leaflet routing machine' nav
  * to see more options and stages please consult documentation:
  * - http://www.liedman.net/leaflet-routing-machine/#getting-started (official site)
  * - http://www.liedman.net/leaflet-routing-machine/tutorials/ (tutorials - official)
  * - http://www.liedman.net/leaflet-routing-machine/api/ (API-Doc)
  * - https://github.com/perliedman/leaflet-routing-machine#readme (gitHub)
  * @param localLat (start lat) - user gps located latitude
  * @param localLon (start lon) - user gps located longitude
  * @param distLat (end lat) - distant itinary latitude location
  * @param distLon (end lon) - distant itinary longitude location
  */
  routingModule(localLat: number, localLon: number, distLat: number, distLon: number): void {   // arguments 'lat' & 'lon' => possibilité de 'latLong' [lat, lon]
    console.log('ROUTINGMODULE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    if (!this.routingMachineIsRunning) {
      this.routingMachineIsRunning = true;
    }
    this.routeControl = L.Routing.control({
        waypoints: [
          L.latLng(localLat, localLon),
          L.latLng(distLat, distLon)
        ],
        show: true,
        addWaypoints: false,
        showAlternatives: false,
        containerClassName: 'contClass',
        alternativeClassName: 'altNav',
      }).addTo(this.map);
  }

}
