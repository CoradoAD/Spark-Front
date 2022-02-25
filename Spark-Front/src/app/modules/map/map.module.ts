import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from 'src/app/components/map/map.component';
import { ItineraryComponent } from 'src/app/components/itinerary/itinerary.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapRoutingModule } from './map-routing.module';



@NgModule({
  declarations: [
    MapComponent,
    ItineraryComponent
  ],
  imports: [
    CommonModule,
    LeafletModule,
    MapRoutingModule,
  ],
  exports: [
    MapComponent,
    ItineraryComponent
  ]
})
export class MapModule { }
