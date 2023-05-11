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
import { LoadingComponent } from './compartido/loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { AtencionMesasComponent } from './ingresos/atencion-mesas/atencion-mesas.component';
import {CalendarModule} from 'primeng/calendar';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CuadreCajaComponent,
    LoadingComponent,
    AtencionMesasComponent
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
    FormsModule,
    ProgressSpinnerModule,
    CalendarModule
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
