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
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {AccordionModule} from 'primeng/accordion';
import {InputTextareaModule} from 'primeng/inputtextarea';
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
    LoadingModule,
    ConfirmDialogModule,
    AccordionModule,
    InputTextareaModule
    
  ],
  providers: [DatePipe, ConfirmationService]
})
export class AtencionMesasModule { }