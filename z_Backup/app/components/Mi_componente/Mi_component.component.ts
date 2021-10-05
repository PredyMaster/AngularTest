import { Component } from '@angular/core';

@Component({
    selector: 'mi-componente',
    templateUrl: './Mi_componente.component.html'
})

export class Micomponente{

    public titulo: string;
    public comentario: string;
    public year: number;
    
    constructor(){
        this.titulo= "Super Titulo";
        this.comentario= "Super Comentario";
        this.year = 2021;
    }

}