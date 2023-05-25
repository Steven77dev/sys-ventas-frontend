import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 
import { BuscarPedidosMesaRequest } from 'src/app/models/comercial/atencion-mesas/buscar-pedidos-mesa.model';
import { RootListarPedidosMesaResponse } from 'src/app/models/comercial/atencion-mesas/listar-pedidos-mesa.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosPorMesaService {
  private apiUrl = '/pedidosPorMesa';
  readonly _URL: string;

  constructor(private http: HttpClient) {
    this._URL = environment.apiRest.host + "/comercial";
  }
 

  listadoPedidosPorMesa(request: BuscarPedidosMesaRequest): Observable<RootListarPedidosMesaResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RootListarPedidosMesaResponse>(this._URL + this.apiUrl, request, { headers });
  }

}