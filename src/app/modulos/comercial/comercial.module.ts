import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ComercialRoutingModule } from './comercial-routing.module';
// Importa los componentes que necesites en FinanzasModule

@NgModule({ 
  imports: [
    CommonModule,
    ComercialRoutingModule
    // Importa los módulos adicionales que necesites en FinanzasModule
  ]
})
export class ComercialModule { }