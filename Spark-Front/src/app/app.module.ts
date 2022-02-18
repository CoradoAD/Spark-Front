import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';

import { NavbarComponent } from './components/navbar/navbar.component';

import { PopupErrorMessageComponent } from './components/popup-error-message/popup-error-message.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,    
    NavbarComponent,
    PopupErrorMessageComponent
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
