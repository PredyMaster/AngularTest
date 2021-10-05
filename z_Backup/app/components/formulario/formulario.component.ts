import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  public user: any;
  public campo!: string;

  constructor() {
    this.user = {
      nombre: "",
      apellidos: "",
      bio: "",
      genero:""
    }
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.user);
  }

  hadDadoClick(){
    alert("CLICK");
  }

  pulsarEnter(){
    alert("Le has dado al enter");
  }

}
