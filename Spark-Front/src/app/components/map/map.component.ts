// -- Gestion de l'affichage de la map (affichage de la carte 'OpenStreetMap' et de ses dépendances) -- //
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
// -> Imports 'leaflet'
import * as L from "leaflet";
import { latLng, tileLayer } from 'leaflet';
// -> imports 'routing-machine' & 'Graphhopper'
import 'leaflet-routing-machine';
import { ItineraryDisplayService } from 'src/app/shared/services/itinerary-display.service';
import { MapService } from 'src/app/shared/services/map.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnDestroy {
  @Input() options!: L.MapOptions;


  constructor( public mapService: MapService,  ) {
    this.setMapOptions();
   }

   setMapOptions() {
    this.options = this.mapService.setMapOptions();
  }

  /**
   * Call to leaflet map initializer & param
   * @param map Leaflet 'Map'
   */
  onMapReady(map: L.Map) {
    this.mapService.MapReady(map);
  }

  ngOnDestroy() {
    this.mapService.map.clearAllEventListeners();
    this.mapService.map.remove();
  };

}
