import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CapacidadService } from '../service/capacidad.service';

export interface Capacidad{
    id: number;
}

export interface Bootcamp {
    nombre: string;
    descripcion: string;
    listaCapacidad: Capacidad[];
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
    listaTecnologias: TecnologiaRes[];
}

export interface BootcampRes {
    nombre: string;
    descripcion: string;
    cantidadCapacidad: number;
    listaCapacidades: CapacidadRes[];
}

@Injectable({
  providedIn: 'root'
})
export class BootcampService {
    constructor(private http: HttpClient, private capacidadService: CapacidadService) { }

    guardar(bootcamp: Bootcamp): Observable<Bootcamp> {
        return this.capacidadService.guardarBootcamp(bootcamp);
    }

    obtenerBootcampPaginados(request: any): Observable<any> {
        return this.capacidadService.obtenerBootcampPaginados(request);
    }
}