import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TecnologiaComponent } from './tecnologia/tecnologia.component';
import { CapacidadComponent } from './capacidad/capacidad.component';
import { BootcampComponent } from './bootcamp/bootcamp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'signIn',
    pathMatch: 'full',
  },
  {
    path: 'tecnologia',
    component: TecnologiaComponent,
  },
  {
    path: 'capacidades',
    component: CapacidadComponent,
  },
  {
    path: 'bootcamp',
    component: BootcampComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'signIn',
    component: SignInComponent,
  },
  {
    path: 'signUp',
    component: SignUpComponent,
  },
  {
    path: '**',
    redirectTo: 'signIn',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
