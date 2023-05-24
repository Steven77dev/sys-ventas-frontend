import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';  
import { AtencionMesasComponent } from './atencion-mesas.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: AtencionMesasComponent }
	])],
	exports: [RouterModule]
})
export class AtencionMesasRoutingModule { }