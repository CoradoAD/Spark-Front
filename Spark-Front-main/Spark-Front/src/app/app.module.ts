import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/users/register/register.component';
import { ProfilComponent } from './components/users/profil/profil.component';
import { HomeComponent } from './components/users/home/home.component';
import { BoderUserComponent } from './components/users/boder-user/boder-user.component';
import { BoderAdminComponent } from './components/users/boder-admin/boder-admin.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/users/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    ProfilComponent,
    HomeComponent,
    BoderUserComponent,
    BoderAdminComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
