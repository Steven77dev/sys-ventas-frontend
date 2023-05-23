import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { CuadreCajaComponent } from './cuadrecaja.component';

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: CuadreCajaComponent }
	])],
	exports: [RouterModule]
})
export class CuadreCajaRoutingModule { }