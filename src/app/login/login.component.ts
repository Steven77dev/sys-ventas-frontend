import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesToastService } from '../servicios/compartido/mensajes-toast.service'; 
import { PrimeNGConfig } from 'primeng/api';
import { IniciarSesionRequest } from '../models/usuarios/login/iniciar-sesion-request.model';
import { InicioSesionService } from '../servicios/usuarios/login/iniciar-sesion.service'; 
import { RootObjectSesionResponse } from '../models/usuarios/login/sesion-response.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MensajesToastService] // asegúrate de que esté aquí también
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });
  error: string="";
  submitted=false;
  cargando: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder,  
    private mensajeToast: MensajesToastService,
    private iniciarSesion: InicioSesionService) {}

  ngOnInit() { 
     
    
      // Verificar si hay información de inicio de sesión almacenada en localStorage
      const token = localStorage.getItem('token');
    
      if (token) {
        // Redirigir al usuario al panel de control (dashboard)
        this.router.navigate(['/dashboard']);
      }
    
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    const request: IniciarSesionRequest = new IniciarSesionRequest(email, password);

    this.iniciarSesion.iniciarSesion(request).subscribe({
      next: (data: RootObjectSesionResponse) => {
        this.cargando = true;
        if(data.codigo==0 && (data.respuesta.estado==8 || data.respuesta.estado==1)){
          this.mensajeToast.showSuccess('Bienvenido', data.respuesta.descripcion);
          localStorage.setItem("token", data.respuesta.sesion);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
          
        } else{
          this.mensajeToast.showError('Error', data.respuesta.descripcion);
          
        }
      },
      error: (errorResponse: any) => {
        this.error = errorResponse;
      },
      complete: () => {      
          this.cargando = false;
       
        
      },
     });
  }
}
