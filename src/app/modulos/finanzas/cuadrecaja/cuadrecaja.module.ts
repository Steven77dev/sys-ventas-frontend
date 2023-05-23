import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CuadreCajaRoutingModule } from './cuadrecaja-routing.module'; 
import { DropdownModule } from 'primeng/dropdown';
import { CuadreCajaComponent } from './cuadrecaja.component';

// Importa los módulos de PrimeNG que necesites

@NgModule({
  declarations: [
    CuadreCajaComponent
  ],
  imports: [
    CommonModule, 
    FormsModule,
    DropdownModule,
    CuadreCajaRoutingModule
    // Importa los módulos de PrimeNG que necesites
  ]
})
export class CuadreCajaModule { }