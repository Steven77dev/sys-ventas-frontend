import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'cuadrar-caja', data: { breadcrumb: 'Cuadrar caja' }, loadChildren: () => import('./cuadrecaja/cuadrecaja.module').then(m => m.CuadreCajaModule) },

        { path: '**', redirectTo: '/noencontrado' }
    ])],
    exports: [RouterModule]
})
export class FinanzasRoutingModule { }