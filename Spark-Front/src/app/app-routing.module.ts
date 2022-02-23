import { Component, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddressBarComponent } from './components/address-bar/address-bar.component';
import { BottomPopupInteractiveComponent } from './components/bottom-popup-interactive/bottom-popup-interactive.component';
import { BottomPopupComponent } from './components/bottom-popup/bottom-popup.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfilComponent } from './components/profil/profil.component';
import { BoderUserComponent } from './components/boder-user/boder-user.component';
import { BoderAdminComponent } from './components/boder-admin/boder-admin.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfilComponent },
  { path: 'user', component: BoderUserComponent },

  { path: 'admin', component: BoderAdminComponent },
  // { path: '', redirectTo: 'home', pathMatch: 'full' }

  // { path: '**', component: PageNotFoundComponent },  // Wildcard route for a 404 page
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
