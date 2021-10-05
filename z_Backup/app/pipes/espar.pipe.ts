import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'espar'
})

export class EsParPipe implements PipeTransform{

    
    transform(value: any){

        let miAno = value.slice(6,10);

       if( miAno%2 == 0){
            console.log('par');
        }else{
            console.log('IMpar');
        }


        return "El año es " + value;
    }
}