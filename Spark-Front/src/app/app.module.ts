import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import { BottomPopupInteractiveComponent } from './components/bottom-popup-interactive/bottom-popup-interactive.component';
import { AddFavoritesComponent } from './components/bottom-popup-interactive/add-favorites/add-favorites.component';
import { MessageComponent } from './components/bottom-popup-interactive/message/message.component';

import { BottomPopupComponent } from './components/bottom-popup/bottom-popup.component';
import { FavoriteMessageComponent } from './components/bottom-popup/favoriteMessage/favoriteMessage.component';
import { MessageStandardComponent } from './components/bottom-popup/messageStandard/messageStandard.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,

    BottomPopupInteractiveComponent,
    AddFavoritesComponent,
    MessageComponent,

    BottomPopupComponent,
    FavoriteMessageComponent,
    MessageStandardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
