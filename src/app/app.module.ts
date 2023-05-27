import { LOCALE_ID, NgModule } from '@angular/core'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password'; 
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from './compartido/loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner'; 
import {  HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NotfoundComponent } from './modulos/notfound/notfound.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { PrimeNGConfig } from 'primeng/api';
registerLocaleData(localeEs);
import { esTranslation } from './i18n/es';
import { LoadingModule } from './compartido/loading.module';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,  
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
    LoadingModule
    
  ],
  providers: [{ provide:  LocationStrategy, useClass: HashLocationStrategy},MessageService, {provide: LOCALE_ID, useValue: 'es'}],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private primengConfig: PrimeNGConfig) {
    primengConfig.setTranslation(esTranslation);
    this.primengConfig.ripple = true;
   
  }
}
