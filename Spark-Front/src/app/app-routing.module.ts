import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressBarComponent } from './components/address-bar/address-bar.component';

import { BottomPopupInteractiveComponent } from './components/bottom-popup-interactive/bottom-popup-interactive.component';

import { BottomPopupComponent } from './components/bottom-popup/bottom-popup.component';


const routes: Routes = [ {
  path: "", component: AddressBarComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
