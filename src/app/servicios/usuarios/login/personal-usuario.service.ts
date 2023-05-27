import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RootObjectPersonalUsuarioResponse } from 'src/app/models/usuarios/login/personal-usuario-response.model';

@Injectable({
  providedIn: 'root'
})
export class PersonalUsuarioService {
  private apiUrl = '/obtenerPersonal';
  readonly _URL: string;

  constructor(private http: HttpClient) {
    this._URL = environment.apiRest.host + "/usuario";
  }
 
  obtenerPersonalUsuario(usuario: string): Observable<RootObjectPersonalUsuarioResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<RootObjectPersonalUsuarioResponse>(this._URL +this.apiUrl+ "/"+ usuario, { headers });
  }

}