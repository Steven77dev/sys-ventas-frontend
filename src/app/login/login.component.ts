import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesToastService } from '../servicios/compartido/mensajes-toast.service'; 
import { PrimeNGConfig } from 'primeng/api';
import { IniciarSesionRequest } from '../models/usuarios/login/iniciar-sesion-request.model';
import { InicioSesionService } from '../servicios/usuarios/login/iniciar-sesion.service'; 
import { RootObjectSesionResponse } from '../models/usuarios/login/sesion-response.model';
import { PersonalUsuarioService } from '../servicios/usuarios/login/personal-usuario.service';
import { PersonalUsuarioResponse, RootObjectPersonalUsuarioResponse } from '../models/usuarios/login/personal-usuario-response.model';

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
  personalUsuario!: RootObjectPersonalUsuarioResponse;
  constructor(
    private router: Router,
    private fb: FormBuilder,  
    private mensajeToast: MensajesToastService,
    private iniciarSesion: InicioSesionService,
    private personalUsuarioService: PersonalUsuarioService) {}

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
      next: (iniciarSesionResponse: RootObjectSesionResponse) => {
        this.cargando = true;
        if(iniciarSesionResponse.codigo==0 && (iniciarSesionResponse.respuesta.estado==8 || iniciarSesionResponse.respuesta.estado==1)){
          
          //localStorage.setItem("token", data.respuesta.sesion);
          this.personalUsuarioService.obtenerPersonalUsuario(email).subscribe({
            next: (data: RootObjectPersonalUsuarioResponse) => {
              localStorage.setItem("codPersonal", data.respuesta.personal);
              localStorage.setItem("nombres", data.respuesta.nombres);
              localStorage.setItem("entidad", data.respuesta.entidad);
              localStorage.setItem("almacen", data.respuesta.almacen);
              localStorage.setItem("ptoAtencion", data.respuesta.puntoAtencion);
              localStorage.setItem("local", data.respuesta.local);
              localStorage.setItem("nombreLocal", data.respuesta.nombreLocal);
              localStorage.setItem("codPersona", data.respuesta.persona);
              setTimeout(() => {
                this.router.navigate(['/dashboard']);
              }, 2000);
              this.mensajeToast.showSuccess('Bienvenido', iniciarSesionResponse.respuesta.descripcion);
            },
            error: (errorResponse: any) => { 
              this.mensajeToast.showError('Error', 'Se presentó un error al obtener datos del personal');
            },
            complete: () => {      
                this.cargando = false;
             
              
            },
           });
          
          
        } else{
          this.mensajeToast.showError('Error', iniciarSesionResponse.respuesta.descripcion);
          
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
