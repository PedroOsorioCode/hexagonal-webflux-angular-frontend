import { Component } from '@angular/core';
import { Bootcamp, BootcampService, BootcampRes } from '../service/bootcamp.service';
import { CapacidadService, Capacidad, CapacidadRes} from '../service/capacidad.service';

@Component({
  selector: 'app-bootcamp',
  templateUrl: './bootcamp.component.html',
  styleUrls: ['./bootcamp.component.scss']
})
export class BootcampComponent {
  bootcamps: BootcampRes[] = [];
  capacidades: CapacidadRes[] = [];
  capacidadesSeleccionadas: number[] = [];
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

  constructor(private bootcampService: BootcampService, private capacidadService: CapacidadService) { }

  ngOnInit() {
    this.cargarBootcamp();
    this.cargarCapacidades();
  }

  cargarBootcamp() {
    const request = {
      columnaOrdenamiento: this.columnOrder,
      direccionOrdenamiento: this.orientacion,
      numeroPagina: this.pageNumber,
      tamanoPorPagina: this.pageSize
    };

    this.bootcampService.obtenerBootcampPaginados(request).subscribe(response => {
      this.bootcamps = response.content;
      this.pageNumber = response.pageNumber;
      this.pageSize = response.pageSize;
      this.totalPages = response.totalPages;
      this.totalElements = response.totalElements;
    });
  }

  guardar() {
    this.conflicto = '';
    const nuevoBootcamp: Bootcamp = { nombre: this.nombre, descripcion: this.descripcion, listaCapacidad: this.capacidadesSeleccionadas.map(id => ({ id })) };

    this.bootcampService.guardar(nuevoBootcamp).subscribe(
      (response) => {
        this.mostrarAlerta = true;
        console.log('Bootcamp guardado:', response);
        this.nombre = '';
        this.descripcion = '';
        this.cargarBootcamp();
      },
      (error) => {
        this.conflicto = error.error.message;
        console.log('Error al guardar el bootcamp:', error);
      }
    );
  }

  paginaAnterior() {
    if (this.pageNumber > 0) {
      this.pageNumber--;
      this.cargarBootcamp();
    }
  }

  paginaSiguiente() {
    if (this.pageNumber < this.totalPages - 1) {
      this.pageNumber++;
      this.cargarBootcamp();
    }
  }

  ordenar(col: string, ori: string){
    this.columnOrder = col;
    this.orientacion = ori;
    this.cargarBootcamp();
  }

  ordenarCantidad(col: string, ori: string){
    this.columnOrder = col;
    this.orientacion = ori;
    this.cargarBootcamp();
  }

  cargarCapacidades() {
    const request = {
      columnaOrdenamiento: "nombre",
      direccionOrdenamiento: "asc",
      numeroPagina: 0,
      tamanoPorPagina: 100
    };

    this.capacidadService.obtenerCapacidadesPaginadas(request).subscribe(response => {
      this.capacidades = response.content;
    });
  }

}
