import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
 
import { DropdownModule } from 'primeng/dropdown'; 
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { AtencionMesasComponent } from './atencion-mesas.component';
import { AtencionMesasRoutingModule } from './atencion-mesas-routing.module';

// Importa los módulos de PrimeNG que necesites

@NgModule({
  declarations: [
    AtencionMesasComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    AtencionMesasRoutingModule
    // Importa los módulos de PrimeNG que necesites
  ]
})
export class AtencionMesasModule { }