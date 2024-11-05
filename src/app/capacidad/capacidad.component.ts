import { Component } from '@angular/core';
import { CapacidadService, Capacidad, CapacidadRes} from '../service/capacidad.service';
import { TecnologiaService, Tecnologia } from '../service/tecnologia.service';

@Component({
  selector: 'app-capacidad',
  templateUrl: './capacidad.component.html',
  styleUrls: ['./capacidad.component.scss']
})
export class CapacidadComponent {
  capacidades: CapacidadRes[] = [];
  tecnologias: Tecnologia[] = [];
  tecnologiasSeleccionadas: number[] = [];
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

  constructor(private capacidadService: CapacidadService, private tecnologiaService: TecnologiaService) { }

  ngOnInit() {
    this.cargarCapacidades();
    this.cargarTecnologias();
  }

  cargarCapacidades() {
    const request = {
      columnaOrdenamiento: this.columnOrder,
      direccionOrdenamiento: this.orientacion,
      numeroPagina: this.pageNumber,
      tamanoPorPagina: this.pageSize
    };

    this.capacidadService.obtenerCapacidadesPaginadas(request).subscribe(response => {
      this.capacidades = response.content;
      this.pageNumber = response.pageNumber;
      this.pageSize = response.pageSize;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
    });
  }

  guardar() {
    this.conflicto = '';
    const nuevaCapacidad: Capacidad = { nombre: this.nombre, descripcion: this.descripcion, listaTecnologia: this.tecnologiasSeleccionadas.map(id => ({ id })) };

    this.capacidadService.guardar(nuevaCapacidad).subscribe(
      (response) => {
        this.mostrarAlerta = true;
        console.log('Capacidad guardada:', response);
        this.nombre = '';
        this.descripcion = '';
        this.cargarCapacidades();
      },
      (error) => {
        this.conflicto = error.error.message;
        console.log('Error al guardar la capacidad:', error);
      }
    );
  }

  paginaAnterior() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.cargarCapacidades();
    }
  }

  paginaSiguiente() {
    if (this.pageNumber < this.totalPages - 1) {
      this.pageNumber++;
      this.cargarCapacidades();
    }
  }

  ordenar(col: string, ori: string){
    this.columnOrder = col;
    this.orientacion = ori;
    this.cargarCapacidades();
  }

  ordenarCantidad(col: string, ori: string){
    this.columnOrder = col;
    this.orientacion = ori;
    this.cargarCapacidades();
  }

  cargarTecnologias() {
    const request = {
      columnaOrdenamiento: "nombre",
      direccionOrdenamiento: "asc",
      numeroPagina: 0,
      tamanoPorPagina: 100
    };

    this.tecnologiaService.obtenerTecnologiasPaginadas(request).subscribe(response => {
      this.tecnologias = response.content;
    });
  }

}
