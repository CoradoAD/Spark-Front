import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from 'src/app/modules/map/map.component';


const routes: Routes = [
  {
    path: '',
    component: MapComponent,
  },
  {
    path: '',
    redirectTo: '/home/map',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapRoutingModule { }
