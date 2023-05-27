import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuscarMesasRequest } from 'src/app/models/comercial/atencion-mesas/buscar-mesas-request.model'; 
import { RootListarMesasLocalResponse } from 'src/app/models/comercial/atencion-mesas/listar-mesas-response.model';
import { RootListarProductosPorPedirResponse } from 'src/app/models/comercial/atencion-mesas/listar-productos-pedir.model';
import { BuscarProductosPorPedirRequest } from 'src/app/models/comercial/atencion-mesas/buscar-productos-pedir-request.model';
import { CrearPedidoRequest } from 'src/app/models/comercial/atencion-mesas/crear-pedido-request.model';
import { BuscarPedidosMesaRequest } from 'src/app/models/comercial/atencion-mesas/buscar-pedidos-mesa-request.model';
import { RootListarPedidosMesaResponse } from 'src/app/models/comercial/atencion-mesas/listar-pedidos-mesa.model';
import { AgregarProductoPedidoRequest } from 'src/app/models/comercial/atencion-mesas/agregar-producto-pedido-request.model';

@Injectable({
  providedIn: 'root'
})
export class AtencionMesasService { 
  readonly _URL: string;

  constructor(private http: HttpClient) {
    this._URL = environment.apiRest.host + "/comercial";
  }
 

  listadoMesasLocal(request: BuscarMesasRequest): Observable<RootListarMesasLocalResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RootListarMesasLocalResponse>(this._URL + "/listadoMesasLocal", request, { headers });
  }

  listadoProductosPorPedir(request: BuscarProductosPorPedirRequest): Observable<RootListarProductosPorPedirResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RootListarProductosPorPedirResponse>(this._URL + "/productosPorPedir", request, { headers });
  }

  crearPedido(request: CrearPedidoRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this._URL + "/crearPedido", request, { headers });
  }

  listadoPedidosPorMesa(request: BuscarPedidosMesaRequest): Observable<RootListarPedidosMesaResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RootListarPedidosMesaResponse>(this._URL + "/pedidosPorMesa", request, { headers });
  }

  agregarProductoPedido(request: AgregarProductoPedidoRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this._URL + "/agregarProductoPedido", request, { headers });
  }


}