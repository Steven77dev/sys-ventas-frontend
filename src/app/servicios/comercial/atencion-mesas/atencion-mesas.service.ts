import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BuscarMesasRequest } from 'src/app/models/comercial/atencion-mesas/buscar-mesas-request.model'; 
import { RootListarMesasLocalResponse } from 'src/app/models/comercial/atencion-mesas/listar-mesas-response.model';
import { RootListarProductosPorPedirResponse } from 'src/app/models/comercial/atencion-mesas/listar-productos-pedir.model';
import { BuscarProductosPorPedirRequest } from 'src/app/models/comercial/atencion-mesas/buscar-productos-pedir-request.model';

@Injectable({
  providedIn: 'root'
})
export class AtencionMesasService {
  private apiUrl = '/listadoMesasLocal';
  readonly _URL: string;

  constructor(private http: HttpClient) {
    this._URL = environment.apiRest.host + "/comercial";
  }
 

  listadoMesasLocal(request: BuscarMesasRequest): Observable<RootListarMesasLocalResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RootListarMesasLocalResponse>(this._URL + this.apiUrl, request, { headers });
  }

  listadoProductosPorPedir(request: BuscarProductosPorPedirRequest): Observable<RootListarProductosPorPedirResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RootListarProductosPorPedirResponse>(this._URL + "/productosPorPedir", request, { headers });
  }

}