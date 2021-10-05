import { Component, OnInit, DoCheck, OnDestroy } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaService } from '../../services/pelicula.service';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css'],
  providers: [PeliculaService]
})
export class PeliculasComponent implements OnInit, DoCheck, OnDestroy {

  public titulo: string;
  /* public peliculas: Array<Pelicula>; */
  public peliculas: Pelicula[];
  public favorita!: Pelicula;
  public fecha: any;

  constructor( 
    private _peliculaService: PeliculaService
  ){

    
    /* this.peliculas = [
      {year: 2021, title: 'El juego del calamar', image: '../../assets/images/Calamar.jpg'},
      {year: 2020, title: 'Los vengadores', image: '../../assets/images/Vengadores.png'},
      {year: 2019, title: 'Los simpsons', image: '../../assets/images/Simpsons.jpg'},
    ]; */

    this.titulo = "Titulo susceptible a cambios";
    this.peliculas = this._peliculaService.getPeliculas();
    this.fecha = new Date(2021, 5, 16);

    /* console.log("1 - Se ejecuta el constructor"); */
  }

  ngOnInit(): void {
    /* console.log(this.peliculas[0]);
    console.log("2 - Se ejecuta el ngOnInit"); */
  }

  ngDoCheck(): void {
    /* console.log("3 - Se ejecuta el DoCheck"); */
  }

  ngOnDestroy(): void {
    /* console.log("El componente se va a eliminar ngOnDestroy"); */
  }

  cambiarTitulo(){
    this.titulo = "CAMBIO";
  }

  mostrarFavorita(event: any){
    this.favorita = event.pelicula;
  }

}
