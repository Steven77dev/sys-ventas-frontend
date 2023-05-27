import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { BuscarPedidosMesaRequest } from 'src/app/models/comercial/atencion-mesas/buscar-pedidos-mesa-request.model';
import { RootListarPedidosMesaResponse } from 'src/app/models/comercial/atencion-mesas/listar-pedidos-mesa.model';
import { AgregarProductoPedidoRequest } from 'src/app/models/comercial/atencion-mesas/agregar-producto-pedido-request.model';

@Injectable({
  providedIn: 'root'
})
export class AgregarProductoPedidoService {
  private apiUrl = '/agregarProductoPedido';
  readonly _URL: string;

  constructor(private http: HttpClient) {
    this._URL = environment.apiRest.host + "/comercial";
  }
 

  agregarProductoPedido(request: AgregarProductoPedidoRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this._URL + this.apiUrl, request, { headers });
  }

}