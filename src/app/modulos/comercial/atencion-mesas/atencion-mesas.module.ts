import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {DataViewModule} from 'primeng/dataview';
import { DropdownModule } from 'primeng/dropdown'; 
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { AtencionMesasComponent } from './atencion-mesas.component';
import { AtencionMesasRoutingModule } from './atencion-mesas-routing.module';
import {TooltipModule} from 'primeng/tooltip';
import {DialogModule} from 'primeng/dialog';
import {TableModule} from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
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
    AtencionMesasRoutingModule,
    DataViewModule,
    TooltipModule,
    DialogModule,
    TableModule,
    InputNumberModule
    // Importa los módulos de PrimeNG que necesites
  ]
})
export class AtencionMesasModule { }