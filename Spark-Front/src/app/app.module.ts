import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PopupErrorMessageComponent } from './components/popup-error-message/popup-error-message.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';
import { BoderAdminComponent } from './components/boder-admin/boder-admin.component';
import { BoderUserComponent } from './components/boder-user/boder-user.component';
import { AddFavoritesComponent } from './components/bottom-popup-interactive/add-favorites/add-favorites.component';
import { BottomPopupInteractiveComponent } from './components/bottom-popup-interactive/bottom-popup-interactive.component';
import { MessageComponent } from './components/bottom-popup-interactive/message/message.component';
import { BottomPopupComponent } from './components/bottom-popup/bottom-popup.component';
import { FavoriteMessageComponent } from './components/bottom-popup/favoriteMessage/favoriteMessage.component';
import { MessageStandardComponent } from './components/bottom-popup/messageStandard/messageStandard.component';
import { ProfilComponent } from './components/profil/profil.component';
import { ParkingsComponent } from './components/parkings/parkings.component';
import { ParkingComponent } from './components/parkings/parking/parking.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PopupErrorMessageComponent,
    BottomPopupInteractiveComponent,
    AddFavoritesComponent,
    MessageComponent,
    BottomPopupComponent,
    FavoriteMessageComponent,
    MessageStandardComponent,
    AddressBarComponent,
    BoderUserComponent,
    BoderAdminComponent,
    ProfilComponent,
    ParkingsComponent,
    ParkingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
