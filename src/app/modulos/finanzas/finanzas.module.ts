import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanzasRoutingModule } from './finanzas-routing.module';  
// Importa los componentes que necesites en FinanzasModule

@NgModule({ 
  imports: [
    CommonModule,
    FinanzasRoutingModule
    // Importa los módulos adicionales que necesites en FinanzasModule
  ]
})
export class FinanzasModule { }