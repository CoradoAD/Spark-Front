import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ItineraryComponent } from 'src/app/components/itinerary/itinerary.component';
import { ParkingComponent } from 'src/app/components/parkings/parking/parking.component';
import { ParkingsComponent } from 'src/app/components/parkings/parkings.component';
import { MapComponent } from 'src/app/modules/map/map.component';
import { MapRoutingModule } from './map-routing.module';


/**
 * Map Module and sub components
 */
@NgModule({
  declarations: [
    MapComponent,
    ItineraryComponent,
    ParkingsComponent,
    ParkingComponent
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
