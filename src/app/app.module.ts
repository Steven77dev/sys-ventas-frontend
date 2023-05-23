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
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {DropdownModule} from 'primeng/dropdown';
import { LoadingComponent } from './compartido/loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; 
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NotfoundComponent } from './modulos/notfound/notfound.component';
import { AppLayoutModule } from './layout/app.layout.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, 
    LoadingComponent,
    NotfoundComponent
  ],
  imports: [
    AppRoutingModule, 
    ProgressSpinnerModule,
    PasswordModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    AppLayoutModule,
    
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy},MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
