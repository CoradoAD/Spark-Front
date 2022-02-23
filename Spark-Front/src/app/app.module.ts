import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PopupErrorMessageComponent } from './components/popup-error-message/popup-error-message.component';

import { BottomPopupInteractiveComponent } from './components/bottom-popup-interactive/bottom-popup-interactive.component';
import { AddFavoritesComponent } from './components/bottom-popup-interactive/add-favorites/add-favorites.component';
import { MessageComponent } from './components/bottom-popup-interactive/message/message.component';

import { BottomPopupComponent } from './components/bottom-popup/bottom-popup.component';
import { FavoriteMessageComponent } from './components/bottom-popup/favoriteMessage/favoriteMessage.component';
import { MessageStandardComponent } from './components/bottom-popup/messageStandard/messageStandard.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PopupErrorMessageComponent,
    MapComponent,
    BottomPopupInteractiveComponent,
    AddFavoritesComponent,
    MessageComponent,
    BottomPopupComponent,
    FavoriteMessageComponent,
    MessageStandardComponent,
    AddressBarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LeafletModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})

export class AppModule { }
