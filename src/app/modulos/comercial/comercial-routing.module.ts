import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'atencion-mesas', data: { breadcrumb: 'Atención de mesas' }, loadChildren: () => import('./atencion-mesas/atencion-mesas.module').then(m => m.AtencionMesasModule) },

        { path: '**', redirectTo: '/noencontrado' }
    ])],
    exports: [RouterModule]
})
export class ComercialRoutingModule { }