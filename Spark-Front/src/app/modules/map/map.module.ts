import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from 'src/app/modules/map/map.component';
import { ItineraryComponent } from 'src/app/components/itinerary/itinerary.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { MapRoutingModule } from './map-routing.module';
import { ParkingComponent } from 'src/app/components/parkings/parking/parking.component';
import { ParkingsComponent } from 'src/app/components/parkings/parkings.component';
import { BottomPopupComponent } from 'src/app/components/bottom-popup/bottom-popup.component';
import { MessageStandardComponent } from 'src/app/components/bottom-popup/messageStandard/messageStandard.component';
import { FavoriteMessageComponent } from 'src/app/components/bottom-popup/favoriteMessage/favoriteMessage.component';


/**
 * Map Module and sub components
 */
@NgModule({
  declarations: [
    MapComponent,
    ItineraryComponent,
    ParkingsComponent,
    ParkingComponent,
    BottomPopupComponent,
    MessageStandardComponent,
    FavoriteMessageComponent
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
