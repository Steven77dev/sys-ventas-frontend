import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { SelectButtonModule } from 'primeng/selectbutton';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ToastModule } from 'primeng/toast';
import { LoadingModule } from 'src/app/compartido/loading.module';
@NgModule({
  declarations: [
    AtencionMesasComponent,
    
  ],
  imports: [
    CommonModule, 
    FormsModule,
    ProgressSpinnerModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    AtencionMesasRoutingModule,
    DataViewModule,
    TooltipModule,
    DialogModule,
    TableModule,
    InputNumberModule,
    SelectButtonModule,
    OverlayPanelModule,
    ToastModule,
    LoadingModule
    
  ],
  providers: [DatePipe]
})
export class AtencionMesasModule { }