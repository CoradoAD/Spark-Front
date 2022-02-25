import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

/**
 * Set Main App routes and link to MapModule and sub-routes
 */
const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    // Child routes of Home Component (under home module/component)
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
