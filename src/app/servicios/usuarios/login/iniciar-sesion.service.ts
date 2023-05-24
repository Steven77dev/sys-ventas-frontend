import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IniciarSesionRequest } from 'src/app/models/usuarios/login/iniciar-sesion-request.model';
import { RootObjectSesionResponse, SesionResponse } from 'src/app/models/usuarios/login/sesion-response.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicioSesionService {
  private apiUrl = '/iniciar-sesion';
  readonly _URL: string;
   private tokenKey = 'token';

  constructor(private http: HttpClient) {
    this._URL = environment.apiRest.host + "/usuario";
  }
 

  iniciarSesion(request: IniciarSesionRequest): Observable<RootObjectSesionResponse> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<RootObjectSesionResponse>(this._URL + this.apiUrl, request, { headers });
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}