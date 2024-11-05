import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Tecnologia{
    id: number;
}

export interface Capacidad {
    nombre: string;
    descripcion: string;
    listaTecnologia: Tecnologia[];
}

export interface TecnologiaRes {
    id: number;
    nombre: string;
    descripcion: string;
}

export interface CapacidadRes {
    id: number;
    nombre: string;
    descripcion: string;
    cantidadTecnologia: number;
    listaTecnologias: TecnologiaRes[];
}

@Injectable({
  providedIn: 'root'
})
export class CapacidadService {
    private apiUrl = environment.urlCapacidad;

    constructor(private http: HttpClient) { }

    guardar(capacidad: Capacidad): Observable<Capacidad> {
        return this.http.post<Capacidad>(this.apiUrl, capacidad);
    }

    obtenerCapacidadesPaginadas(request: any): Observable<any> {
        return this.http.post<CapacidadRes>(`${this.apiUrl}/listar`, request);
    }

    guardarBootcamp(request: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/registrar-bootcamp`, request);
    }

    obtenerBootcampPaginados(request: any): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/listar-bootcamp`, request);
    }
}