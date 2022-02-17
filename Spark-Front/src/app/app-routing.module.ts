import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BottomPopupInteractiveComponent } from './components/bottom-popup-interactive/bottom-popup-interactive.component';

const routes: Routes = [
  { path: "bottompopupinteractive", component: BottomPopupInteractiveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
