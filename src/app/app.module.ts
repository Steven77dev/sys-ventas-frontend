import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password'; 
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CuadreCajaComponent } from './ingresos/cuadre-caja/cuadre-caja.component'; 
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CuadreCajaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    PasswordModule, 
    BrowserAnimationsModule,
    ToastModule,
    DropdownModule,
    FormsModule
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
