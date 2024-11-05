import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private apiUrl = 'https://9xugq0dc7g.execute-api.us-east-1.amazonaws.com/test/transactions';

  constructor(private http: HttpClient) {}

  getTransactions(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`  // o solo `${token}` si no es de tipo Bearer
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
