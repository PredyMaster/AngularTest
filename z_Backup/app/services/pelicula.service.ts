import { Inject, Injectable } from "@angular/core";
import { Pelicula } from "../models/pelicula";

@Injectable()

export class PeliculaService{

    public peliculas: Pelicula[];

    constructor(){
        this.peliculas = [
            new Pelicula('El juego del calamar', 2021, '../../assets/images/Calamar.jpg'),
            new Pelicula('Los vengadores', 2020, '../../assets/images/Vengadores.png'),
            new Pelicula('Los simpsons', 2019, '../../assets/images/Simpsons.jpg')
          ];
    }

    getPeliculas(){
        return this.peliculas;
    }
}