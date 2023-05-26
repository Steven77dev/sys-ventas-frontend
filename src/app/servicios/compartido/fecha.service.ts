import { DatePipe, registerLocaleData } from "@angular/common";
import { Injectable, Inject } from "@angular/core"; 
import { LOCALE_ID } from '@angular/core'; 
@Injectable({
    providedIn: 'root'
  })
export class FechaConversionService{
    constructor( 
        private datePipe: DatePipe
      ) {}

    public formatearFecha(fecha: Date): string {
      return this.datePipe.transform(fecha, 'dd/MM/yyyy') || '';
    }

    public formatearFechaDDYYMMM(fecha: Date): string {
        fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear().toString();
        let fechaFormateada = `${dia}/${mes}/${anio}`; 
        return fechaFormateada;
      }
}