import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Tecnologia {
    id: number;
    nombre: string;
    descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class TecnologiaService {
    private apiUrl = environment.urlTecnologia;

    constructor(private http: HttpClient) { }

    guardar(tecnologia: Tecnologia): Observable<Tecnologia> {
        return this.http.post<Tecnologia>(this.apiUrl, tecnologia);
    }

    obtenerTecnologiasPaginadas(request: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/listar`, request);
    }
}