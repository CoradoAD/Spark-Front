import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoderAdminComponent } from './components/users/boder-admin/boder-admin.component';
import { BoderUserComponent } from './components/users/boder-user/boder-user.component';
import { HomeComponent } from './components/users/home/home.component';
import { LoginComponent } from './components/users/login/login.component';
import { ProfilComponent } from './components/users/profil/profil.component';
import { RegisterComponent } from './components/users/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfilComponent },
  { path: 'user', component: BoderUserComponent },

  { path: 'admin', component: BoderAdminComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
