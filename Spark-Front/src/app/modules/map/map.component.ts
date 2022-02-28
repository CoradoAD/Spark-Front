// -- Gestion de l'affichage de la map (affichage de la carte 'OpenStreetMap' et de ses dépendances) -- //
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// -> Imports 'leaflet'
import * as L from "leaflet";
// -> imports 'routing-machine' & 'Graphhopper'
import 'leaflet-routing-machine';
import { MapService } from 'src/app/shared/services/map.service';
import { Map } from "leaflet";

import { ParkingDisplayService } from 'src/app/shared/services/parking-display.service';
import { ParkingService } from 'src/app/shared/services/parking.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy {
  @Output() map$: EventEmitter<L.Map> = new EventEmitter;
  @Output() zoom$: EventEmitter<number> = new EventEmitter;
  @Input() options!: L.MapOptions;
  public map!: L.Map;
  public zoom!: number;

  receiveMap(map: Map) {
    this.map = map;
  }
  receiveZoom(zoom: number) {
    this.zoom = zoom;
  }

  constructor(
    private parkingDisplayService: ParkingDisplayService,
    private parkingService: ParkingService,
    public mapService: MapService
    ) {
    this.setMapOptions();
  }

  setMapOptions() {
    this.options = this.mapService.setMapOptions();
  }

  ngOnInit(): void {
  }

  /**
   * Call to leaflet map initializer & param
   * @param map Leaflet 'Map'
   */
  onMapReady(map: L.Map) {
    this.mapService.MapReady(map);
    console.log("after on map ready");
  }




  ngOnDestroy() {
  
    this.mapService.map.clearAllEventListeners();
    this.mapService.map.remove();
  }

}

