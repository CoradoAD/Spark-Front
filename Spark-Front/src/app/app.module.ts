import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { BottomPopupComponent } from './components/bottom-popup/bottom-popup.component';
import { AddFavoritesComponent } from './components/bottom-popup/add-favorites/add-favorites.component';
import { MessageComponent } from './components/bottom-popup/message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    BottomPopupComponent,
    AddFavoritesComponent,
    MessageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
