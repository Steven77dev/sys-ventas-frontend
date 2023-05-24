import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuadreCajaRoutingModule } from './cuadrecaja-routing.module'; 
import { DropdownModule } from 'primeng/dropdown';
import { CuadreCajaComponent } from './cuadrecaja.component';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

// Importa los módulos de PrimeNG que necesites

@NgModule({
  declarations: [
    CuadreCajaComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    CuadreCajaRoutingModule
    // Importa los módulos de PrimeNG que necesites
  ]
})
export class CuadreCajaModule { }