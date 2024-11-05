import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TecnologiaComponent } from './tecnologia/tecnologia.component';
import { CapacidadComponent } from './capacidad/capacidad.component';
import { BootcampComponent } from './bootcamp/bootcamp.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    SignInComponent,
    SignUpComponent,
    TecnologiaComponent,
    CapacidadComponent,
    BootcampComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {
}
