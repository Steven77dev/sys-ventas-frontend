import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './login/login.component';
import { CuadreCajaComponent } from './modulos/finanzas/cuadrecaja/cuadrecaja.component';
import { NotfoundComponent } from './modulos/notfound/notfound.component';

@NgModule({
  imports: [
      RouterModule.forRoot([
        { path: 'login', component: LoginComponent },
        {
          path: '', component: AppLayoutComponent,
          children: [
              //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
              { path: 'dashboard', loadChildren: () => import('./modulos/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
              { path: 'finanzas', loadChildren: () => import('./modulos/finanzas/finanzas.module').then(m => m.FinanzasModule) },
              { path: 'comercial', loadChildren: () =>  import('./modulos/comercial/comercial.module').then(m => m.ComercialModule) },
          ]
      }, 
      
      { path: 'noencontrado', component: NotfoundComponent },
      { path: '**', redirectTo: '/noencontrado' },
      ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
