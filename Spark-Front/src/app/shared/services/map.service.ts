// -- Gestion des services liés à 'map-component' et à la map (OpenStreetMap, etc.) en 'local' -- //
import { EventEmitter, Injectable, Output } from '@angular/core';
import * as L from 'leaflet';
import { latLng, Map, tileLayer } from 'leaflet';
import { NavGps } from '../models/nav-gps';
import 'leaflet-routing-machine';
import { ParkingDisplayService } from './parking-display.service';
import { ParkingService } from './parking.service';
import { interval, Subscription } from 'rxjs';
import { Parking } from '../models/parking';

/**
 * constante representant un interval de 1 minute exprimé en ms
 */
 const UPDATE_PARKING_INTERVAL = 5000;
 const SEARCH_RADIUS = 5;

/**
 * Map service for all map actions
 * Set 'leaflet-map' and 'leaflet-routing-machine'
 */
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
  public needNav= false;
  public syncActualLoc!: NavGps;

  /**
  * Set custom Spark icons for Map Markers
  */
  public myUserIcon = L.icon({
    iconUrl: './assets/ico/map/spark_routing_user-marker.svg',
    iconSize: [35, 35],
    iconAnchor: [5, 18],
    popupAnchor: [-3, -76],
  });
  public myGoalIcon = L.icon({
    iconUrl: './assets/ico/map/spark_routing_goal-marker.svg',
    iconSize: [35, 35],
    iconAnchor: [5, 18],
    popupAnchor: [-3, -76],
  })
  public myViaIcon = L.icon({
    iconUrl: './assets.ico.map/spark_routing_via-marker.svg',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  }) // End of: custom Spark Markers --◊

  sub: Subscription | null = null;
  parkings: Parking[] = [];
  /**
   * parking selectionné lorsque l'on clique sur la carte
   */
  selectedParking: Parking | undefined;
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
      center:latLng(43.61424,3.87117, 14),
    };
    return this.options;
  } // End of: setMapOption --◊

  constructor(private parkingDisplayService: ParkingDisplayService, private parkingService: ParkingService) { console.log(this.navGPS);
   }

  /**
   * Initiate Routing (itinerary) service/module
   * With local and distant GPS points
   * (To convert address into GPS point, use 'leaflet geocoder')
   * @param navGPS NavGps - set local LatLon & dist LatLon
   */
  setRouting(navGPS: NavGps) {
    this.routingModule(navGPS.localLat, navGPS.localLon, navGPS.distLat, navGPS.distLon);
    setInterval(() => this.syncGPSUserLoc(this.syncNavGPS), 500)
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
    this.map.panTo(newLatLngA);
  }

  /**
   * 'Leaflet' method that runs when the map is ready
   * @param map L.Map
   */
  MapReady(map: L.Map, navNeed?: boolean, navGPS?: NavGps) {
    this.parkingDisplayService.map = map;
    this.sub = this.parkingService.parkingsAround$.subscribe((parkings) => {
      this.parkings = parkings;
      this.initParkingWiew();
    });
    this.updateParkingList();
    this.parkingDisplayService.selectedParking$.subscribe((parking) => {
      this.selectedParking = parking;
    });
    this.map = map;
    this.map$.emit(map);
    map.setView([43.61424, 3.87117], 16); // Set variables for init map - Update with variables of user loc ?
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
    // routing-machine launcher
    if (this.needNav) {
      console.log('needNavc is :' + this.needNav);
      this.setRouting(this.navGPS);
    }
  } // End of routing machine launcher --◊

  /**
   * affiche  tous les parkings sur la carte
   */
  initParkingWiew() {
    console.log("init Parking view");
    console.log(this.parkings);
    this.parkingDisplayService.removeParkingsFromMap();
    this.parkings.forEach(parking => {
      this.parkingDisplayService.addParkingOnMap(parking);
    });
    // this.map$.emit(this.map);
  }

  /**
   * fonction mettant à jour la liste des parkings a intervalle régulier
   */
  updateParkingList() {
    this.obs$.subscribe((v) => {
      console.log("update Parking");
      console.log("nav GPS:" + this.syncNavGPS);
      console.log(v);
      if (this.syncNavGPS) {
        this.parkingService.getParkingListAround(this.syncNavGPS.localLat, this.syncNavGPS.localLon, SEARCH_RADIUS);
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
    // Custom Spark icons for Map Markers
    const userMarker = this.myUserIcon;
    const goalMarker = this.myGoalIcon;
    const viaMarker = this.myViaIcon;
    // Set/Update start (actual user) & goal (distant) localisations
    let waypoints = [
      L.latLng(localLat, localLon),
      L.latLng(distLat, distLon),
    ];

    if (!this.routingMachineIsRunning) {
      this.routingMachineIsRunning = true;
    }
    // Leaflet-routing-machine conf & run
    this.routeControl = L.Routing.control({
        waypoints: [
          L.latLng(localLat, localLon),
          L.latLng(distLat, distLon),
        ],
        plan: L.Routing.plan(waypoints, {
          createMarker: function(i, wp, n) {
            if (i == 0) {
              return L.marker(wp.latLng, {
                icon: userMarker
              });
            } else if (i == n -1) {
              return L.marker(wp.latLng, {
                icon: goalMarker
              });
            } else {
              return L.marker(wp.latLng, {
                icon: viaMarker
              });
            }
          },
          routeWhileDragging: true
        }),
        lineOptions: {
          styles: [
            { color: 'green', opacity: 1, weight: 5 },
          ],
          extendToWaypoints: true,
          missingRouteTolerance: 1,
        },
        show: true,
        addWaypoints: false,
        showAlternatives: false,
        containerClassName: 'contClass',
        alternativeClassName: 'altNav',
      }).addTo(this.map).on('routingerror', () => {
        try {
          this.map.getCenter();
        } catch (e) {
          this.map.fitBounds(L.latLngBounds(waypoints));
        }
      });

      L.Routing.errorControl(this.routeControl, {
        header: "Erreur de calcul d'itinéraire",
        formatMessage(error) {
            if (error.status < 0) {
                return 'Le calcul du trajet à causé une erreur. Pour plus de détails :  <code><pre>' +
                    error.message + '</pre></code';
            } else {
                return 'Le trajet ne peut pas être calculé. ' +
                    error.message;
            }
        }
    }).addTo(this.map);
  }

}
