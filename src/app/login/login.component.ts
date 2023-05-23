import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/seguridad/AuthService';
import { MensajesToastService } from '../servicios/compartido/mensajes-toast.service';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MensajesToastService] // asegúrate de que esté aquí también
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });
  error: string="";
  submitted=false;
  cargando: boolean = false;
  constructor(
    private router: Router,
    private fb: FormBuilder, 
    private authService: AuthService,  
    private mensajeToast: MensajesToastService,
    private primengConfig: PrimeNGConfig) {}

  ngOnInit() { 
    this.primengConfig.ripple = true;
  }

  login() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    this.authService.login(email, password).subscribe( {
      next: (data: any) => {
        this.cargando = true;
        if(data.success){
          this.mensajeToast.showSuccess('Bienvenido', data.message);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 2000);
          
        } else{
          this.mensajeToast.showError('Error', data.message);
          
        }
      },
      error: (errorResponse: any) => {
        this.error = errorResponse;
      },
      complete: () => {      
          this.cargando = false;
       
        
      },
    }
  );
  }
}
