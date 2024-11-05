import { Component } from '@angular/core';
import { TecnologiaService, Tecnologia } from '../service/tecnologia.service';

@Component({
  selector: 'app-tecnologia',
  templateUrl: './tecnologia.component.html',
  styleUrls: ['./tecnologia.component.scss']
})
export class TecnologiaComponent {
  tecnologias: Tecnologia[] = [];
  columnOrder: string = 'nombre';
  orientacion: string = 'asc';
  pageNumber = 0;
  pageSize = 5;
  totalPages = 0;
  totalElements = 0;

  // Propiedades del formulario 
  nombre: string = '';
  descripcion: string = '';
  mostrarAlerta: boolean = false;
  conflicto: string = '';

  constructor(private tecnologiaService: TecnologiaService) { } 

  ngOnInit() {
    this.cargarTecnologias();
  }

  cargarTecnologias() {
    const request = {
      columnaOrdenamiento: this.columnOrder,
      direccionOrdenamiento: this.orientacion,
      numeroPagina: this.pageNumber,
      tamanoPorPagina: this.pageSize
    };

    this.tecnologiaService.obtenerTecnologiasPaginadas(request).subscribe(response => {
      this.tecnologias = response.content;
      this.pageNumber = response.pageNumber;
      this.pageSize = response.pageSize;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
    });
  }

  guardar() {
    this.conflicto = '';
    const nuevaTecnologia: Tecnologia = {id:0, nombre: this.nombre, descripcion: this.descripcion };

    this.tecnologiaService.guardar(nuevaTecnologia).subscribe(
      (response) => {
        this.mostrarAlerta = true;
        console.log('Tecnología guardada:', response);
        this.tecnologias.push(response);
        this.nombre = '';
        this.descripcion = '';
      },
      (error) => {
        this.conflicto = error.error.message;
        console.log('Error al guardar la tecnología:', error);
      }
    );
  }

  paginaAnterior() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.cargarTecnologias();
    }
  }

  paginaSiguiente() {
    if (this.pageNumber < this.totalPages - 1) {
      this.pageNumber++;
      this.cargarTecnologias();
    }
  }

  ordenar(col: string, ori: string){
    this.columnOrder = col;
    this.orientacion = ori;
    this.cargarTecnologias();
  }
}
