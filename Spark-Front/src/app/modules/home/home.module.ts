import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ItineraryComponent } from 'src/app/components/itinerary/itinerary.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { ItineraryService } from 'src/app/shared/services/itinerary.service';
import { MapModule } from '../map/map.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LeafletModule,
    MapModule

  ]
})
export class HomeModule { }
