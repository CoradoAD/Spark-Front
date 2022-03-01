import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { BoderAdminComponent } from './components/boder-admin/boder-admin.component';
import { BoderUserComponent } from './components/boder-user/boder-user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProfilComponent } from './components/profil/profil.component';
import { AuthGuard } from './shared/guard/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'profil',
    component: ProfilComponent
  },
  {
    path: 'user',
    component: BoderUserComponent
  },
  {
    path: 'admin',
    component: BoderAdminComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
