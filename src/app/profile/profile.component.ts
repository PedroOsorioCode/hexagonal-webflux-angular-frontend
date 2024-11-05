import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { IUser, CognitoService } from '../cognito.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  user: IUser;
  idToken: string = '';
  mensajeApiGateway: string = '';

  constructor(private cognitoService: CognitoService,
    private transactionService: TransactionService
  ) {
    this.loading = false;
    this.user = {} as IUser;
  }

  public ngOnInit(): void {
    this.cognitoService.getUser()
    .then((user: any) => {
      this.user = user.attributes;
    });

    const storedIdToken = localStorage.getItem('idToken');
    this.idToken = storedIdToken ? storedIdToken : '';
  }

  public update(): void {
    this.loading = true;

    this.cognitoService.updateUser(this.user)
    .then(() => {
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  public getApiGateway(): void{
    this.transactionService.getTransactions(this.idToken).subscribe(
      data => {
        this.mensajeApiGateway = data.body;
      },
      error => {
        console.error('Error al obtener transacciones:', error);
      }
    );
  }

}
