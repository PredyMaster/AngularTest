import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Pelicula } from 'src/app/models/pelicula';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  @Input()
  pelicula!: Pelicula;

  @Output() MarcarFavorita = new EventEmitter();

  @Input()
  i!: number;

  constructor() { }

  ngOnInit(): void {
  }

  seleccionar(event: any, pelicula: Pelicula){
    this.MarcarFavorita.emit({
      pelicula: pelicula
    });

    /* console.log(pelicula); */
  }

}
