import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BoderAdminComponent } from './components/boder-admin/boder-admin.component';
import { BoderUserComponent } from './components/boder-user/boder-user.component';
import { ProfilComponent } from './components/profil/profil.component';


const routes: Routes = [

  { path: 'profile', component: ProfilComponent },
  { path: 'user', component: BoderUserComponent },

  { path: 'admin', component: BoderAdminComponent },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule) },
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  // { path: '', redirectTo: 'home', pathMatch: 'full' }

  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
