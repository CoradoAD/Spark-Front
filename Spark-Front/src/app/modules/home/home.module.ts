import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AddressBarComponent } from 'src/app/components/address-bar/address-bar.component'
import { BoderAdminComponent } from 'src/app/components/boder-admin/boder-admin.component';
import { BoderUserComponent } from 'src/app/components/boder-user/boder-user.component';
import { AddFavoritesComponent } from 'src/app/components/bottom-popup-interactive/add-favorites/add-favorites.component';
import { BottomPopupInteractiveComponent } from 'src/app/components/bottom-popup-interactive/bottom-popup-interactive.component';
import { MessageComponent } from 'src/app/components/bottom-popup-interactive/message/message.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { PageNotFoundComponent } from 'src/app/components/page-not-found/page-not-found.component';
import { PopupErrorMessageComponent } from 'src/app/components/popup-error-message/popup-error-message.component';
import { ProfilComponent } from 'src/app/components/profil/profil.component';
import { LoginModule } from '../login/login.module';
import { MapModule } from '../map/map.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

/**
 * HomePage Module
 * Starting point and link to app components
 */
@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    AddressBarComponent,
    BottomPopupInteractiveComponent,
    PopupErrorMessageComponent,
    AddFavoritesComponent,
    MessageComponent,

    BoderUserComponent,
    BoderAdminComponent,
    ProfilComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    LeafletModule,
    MapModule,
    FormsModule,
    LoginModule
  ]
})
export class HomeModule { }
