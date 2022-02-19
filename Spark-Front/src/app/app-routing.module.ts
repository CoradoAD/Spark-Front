import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BottomPopupComponent } from './components/bottom-popup/bottom-popup.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
