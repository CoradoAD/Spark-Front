import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItineraryComponent } from 'src/app/components/itinerary/itinerary.component';
import { MapComponent } from 'src/app/components/map/map.component';
import { HomeComponent } from './home.component';

// const routes: Routes = [
//   {
//     path: '',
//     loadChildren: () => import('../map/map.module').then(m => m.MapModule)
//   }
// ];

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'map',
        loadChildren: () => import('../map/map.module').then(m => m.MapModule)
      },
      // Exemple de points d'entrée secondaires :
      // 'home/fav'
      // {
      //   path: 'favoris',
      //   loadChildren: () => import('../fav/fav.module').then(m => m.FavModule)
      // },
      // 'home/user-account'
      // {
      //   path: 'user-account',
      //   loadChildren: () => import('../components/user/user-account.component').then(m => m.UserPageComponent)
      // },
      // Default Path :
      {
        path: '',
        redirectTo: '/home/map',
        pathMatch: 'full'
      }
    ]
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
export class HomeRoutingModule { }
