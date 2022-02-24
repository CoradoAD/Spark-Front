import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ItineraryComponent } from 'src/app/components/itinerary/itinerary.component';
import { MapComponent } from 'src/app/components/map/map.component';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';



@NgModule({
  declarations: [
    HomeComponent, MapComponent, ItineraryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
