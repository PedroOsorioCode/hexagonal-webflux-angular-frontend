import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Amplify, { Auth } from 'aws-amplify';

import { environment } from '../environments/environment';

export interface IUser {
  email: string;
  password: string;
  showPassword: boolean;
  code: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CognitoService {

  private authenticationSubject: BehaviorSubject<any>;

  constructor() {
    Amplify.configure({
      Auth: environment.cognito,
    });

    this.authenticationSubject = new BehaviorSubject<boolean>(false);
  }

  public signUp(user: IUser): Promise<any> {
    return Auth.signUp({
      username: user.email,
      password: user.password,
    });
  }

  public confirmSignUp(user: IUser): Promise<any> {
    return Auth.confirmSignUp(user.email, user.code);
  }

  public signIn(user: IUser): Promise<any> {
    return Auth.signIn(user.email, user.password)
    .then((cognitoUser: any) => {
      // Obtener los tokens de la sesión de usuario
      const accessToken = cognitoUser.signInUserSession.accessToken.jwtToken;
      const idToken = cognitoUser.signInUserSession.idToken.jwtToken;
      const refreshToken = cognitoUser.signInUserSession.refreshToken.token;

      // Opcional: guardar los tokens en el almacenamiento local, si lo necesitas
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('refreshToken', refreshToken);

      console.log('Tokens obtenidos:', { accessToken, idToken, refreshToken });

      // Emitir el estado de autenticación
      this.authenticationSubject.next(true);

      // Retornar los tokens o lo que necesites
      return { accessToken, idToken, refreshToken };
    })
    .catch((error: any) => {
      console.error('Error en la autenticación:', error);
      throw error; // Lanza el error para manejarlo fuera
    });
  }

  public signOut(): Promise<any> {
    return Auth.signOut()
    .then(() => {
      this.authenticationSubject.next(false);
    });
  }

  public isAuthenticated(): Promise<boolean> {
    if (this.authenticationSubject.value) {
      return Promise.resolve(true);
    } else {
      return this.getUser()
      .then((user: any) => {
        if (user) {
          return true;
        } else {
          return false;
        }
      }).catch(() => {
        return false;
      });
    }
  }

  public getUser(): Promise<any> {
    return Auth.currentUserInfo();
  }

  public updateUser(user: IUser): Promise<any> {
    return Auth.currentUserPoolUser()
    .then((cognitoUser: any) => {
      return Auth.updateUserAttributes(cognitoUser, user);
    });
  }

}
