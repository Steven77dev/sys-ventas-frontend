import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuscarAperturaCajaRequest } from 'src/app/models/finanzas/cuadrecaja/buscar-apertura-caja-request.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoDiarioService { 
  readonly _URL: string;

  constructor(private http: HttpClient) {
    this._URL = environment.apiRest.host + "/finanzas";
  }

  verficarAperturaCaja(request: BuscarAperturaCajaRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this._URL + "/verificarAperturaCaja", request, { headers });
  }
 
}