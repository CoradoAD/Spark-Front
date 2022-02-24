// -- Gestion des services liés à 'map-component' et à la map (OpenStreetMap, etc.) en 'local' -- //
import { EventEmitter, Injectable, Output } from '@angular/core';
import * as L from 'leaflet';
import { latLng, Map, tileLayer } from 'leaflet';
import { NavGps } from '../models/nav-gps';
import 'leaflet-routing-machine';

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
      layers: [tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
        opacity: 0.7,
        maxZoom: 21,
        detectRetina: true,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })],
      zoom: 1,
      center: latLng(43.61424, 3.87117, 14)
    };
    return this.options;
  }

  constructor() { }

  /**
   * Initiate Routing (itinerary) service/module
   * With local and distant GPS points
   * (To convert address into GPS point, use 'leaflet geocoder')
   * @param navGPS NavGps - set local LatLon & dist LatLon
   */
  setRouting(navGPS: NavGps) {
    this.routingModule(navGPS.localLat, navGPS.localLon, navGPS.distLat, navGPS.distLon);
    setInterval(() => this.syncGPSUserLoc(this.syncNavGPS), 500)
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
    this.map = map;
    this.map$.emit(map);
    map.setView([43.61424, 3.87117], 16); // Set variables for init map
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);

    // // test routing
    this.setRouting(this.navGPS);                            // -- Comment this line to Kill Itinerary module

    // test routing update
    // // If Routing machine isRunning
    // if (this.routingMachineIsRunning) {
    //   this.syncGPSUserLoc(this.syncNavGPS);
    // }
    // End of test routing update --◊
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
    console.log('routingmodule');
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
