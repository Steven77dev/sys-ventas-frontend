import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000'; // Cambiar a la URL de tu servidor de autenticación

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    //return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
    // Aquí deberías verificar las credenciales del usuario en tu base de datos
    // y permitir el acceso a la aplicación si las credenciales son correctas.
    // Para este ejemplo, simplemente retornaremos una observale que se resuelve si las credenciales son correctas
    if (email === 'usuario@example.com' && password === '123456') {
      return of({ success: true, message: 'Tiene 13 días sin actualizar su clave.' });
    } else {
      return of({ success: false, message: 'Correo o contraseña incorrectos' });
    }
  }

  register(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, { email, password });
  }
}