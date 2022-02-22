// -- Gestion de l'affichage de la map (affichage de la carte 'OpenStreetMap' et de ses dépendances) -- //
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import * as L from "leaflet";
import { latLng, tileLayer } from 'leaflet';
import 'leaflet-routing-machine';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<L.Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options: L.MapOptions= {
                      layers:[tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
                        opacity: 0.7,
                        maxZoom: 21,
                        detectRetina: true,
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      })],
                      zoom:1,
                      center:latLng(43.61424,3.87117, 14)
  };
  public map!: L.Map;
  public zoom!: number;

  constructor() { }

  /**
   * 'leaflet routing machine' nav
   * to see more options and stages please consult documentation:
   * - http://www.liedman.net/leaflet-routing-machine/#getting-started (official site)
   * - http://www.liedman.net/leaflet-routing-machine/tutorials/ (tutorials - official)
   * - http://www.liedman.net/leaflet-routing-machine/api/ (API-Doc)
   * - https://github.com/perliedman/leaflet-routing-machine#readme (gitHub)
   */
  routingModule() {
    L.Routing.control({
      waypoints: [
          L.latLng(43.5596, 4.0852),
          L.latLng(43.61424, 3.87117)
      ]
    }).addTo(this.map);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.map.clearAllEventListeners;
    this.map.remove();
  };

  onMapReady(map: L.Map) {
    this.map = map;
    this.map$.emit(map);
    map.setView([43.61424, 3.87117], 16); // Set variables for init map
    this.zoom = map.getZoom();
    this.zoom$.emit(this.zoom);
    // itinerary test for routingModule
    this.routingModule();
  }

  onMapZoomEnd(e: L.ZoomAnimEvent) {
    this.zoom = e.target.getZoom();
    this.zoom$.emit(this.zoom);
  }

}