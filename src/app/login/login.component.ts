import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensajesToastService } from '../servicios/compartido/mensajes-toast.service'; 
import { IniciarSesionRequest } from '../models/usuarios/login/iniciar-sesion-request.model';
import { InicioSesionService } from '../servicios/usuarios/login/iniciar-sesion.service'; 
import { RootObjectSesionResponse } from '../models/usuarios/login/sesion-response.model';
import { PersonalUsuarioService } from '../servicios/usuarios/login/personal-usuario.service';
import { RootObjectPersonalUsuarioResponse } from '../models/usuarios/login/personal-usuario-response.model';
import { catchError, finalize } from 'rxjs';
import { CommonModule } from '@angular/common';
import { UtilService } from '../servicios/util.service';
import { FormHelper } from '../compartido/form.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  cargando: boolean = false;

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private mensajeToast: MensajesToastService,
    private personalUsuarioService: PersonalUsuarioService,
    private iniciarSesion: InicioSesionService
  ) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.cargando = true;
    const { usuario, password } = this.loginForm.value;
    const request: IniciarSesionRequest = new IniciarSesionRequest(usuario,password);
    this.iniciarSesion.iniciarSesion(request).pipe(
      catchError(errorResponse => {
        this.mensajeToast.showError('Error', 'Error al iniciar sesión');
        return [];
      }),
      finalize(() => this.cargando = false)
    ).subscribe(response => {
      if (response.codigo === 0 && (response.respuesta.estado === 8 || response.respuesta.estado === 1)) {
        this.router.navigate(['/dashboard']);
      } else {
        this.mensajeToast.showError('Error', response.respuesta.descripcion);
      }
    });
  }


  obtenerDatosUsuario(email: string, iniciarSesionResponse: RootObjectSesionResponse) {
    this.personalUsuarioService.obtenerPersonalUsuario(email).subscribe({
      next: (data: RootObjectPersonalUsuarioResponse) => {
        localStorage.setItem("nombres", data.respuesta.nombres);
        localStorage.setItem("nombreLocal", data.respuesta.nombreLocal);
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
  }
}
