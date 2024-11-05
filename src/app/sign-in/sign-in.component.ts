import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../cognito.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {

  loading: boolean;
  user: IUser;
  mensaje!: string;

  constructor(private router: Router,
              private cognitoService: CognitoService) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public signIn(): void {

    if(this.user.email == undefined || this.user.password == undefined){
      this.mensaje = 'Faltan datos por ingresar';
      return;
    }
    
    this.loading = true;
    this.cognitoService.signIn(this.user).then(() => {
      this.mensaje = "";
      this.router.navigate(['/profile']);
    }).catch(() => {
      this.loading = false;
      this.mensaje = 'Usuario no existe';
    });
  }

}
