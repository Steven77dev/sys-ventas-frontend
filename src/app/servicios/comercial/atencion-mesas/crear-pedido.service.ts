import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';  
import { AgregarProductoPedidoRequest } from 'src/app/models/comercial/atencion-mesas/agregar-producto-pedido-request.model';
import { CrearPedidoRequest } from 'src/app/models/comercial/atencion-mesas/crear-pedido-request.model';

@Injectable({
  providedIn: 'root'
})
export class CrearPedidoService {
  private apiUrl = '/crearPedido';
  readonly _URL: string;

  constructor(private http: HttpClient) {
    this._URL = environment.apiRest.host + "/comercial";
  }
 

  crearPedido(request: CrearPedidoRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this._URL + this.apiUrl, request, { headers });
  }

}