import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { AppLayoutComponent } from './layout/app.layout.component';
import { LoginComponent } from './login/login.component';
import { CuadreCajaComponent } from './modulos/finanzas/cuadrecaja/cuadrecaja.component';
import { NotfoundComponent } from './modulos/notfound/notfound.component';

@NgModule({
  imports: [
      RouterModule.forRoot([
        { path: '', component: LoginComponent },
        {
          path: '', component: AppLayoutComponent,
          children: [
              //{ path: '', redirectTo: 'dashboard', pathMatch: 'full' },
              { path: 'dashboard', loadChildren: () => import('./modulos/dashboard/dashboard.module').then(m => m.DashboardModule) }, 
              { path: 'finanzas', loadChildren: () => import('./modulos/finanzas/finanzas.module').then(m => m.FinanzasModule) },
              /*{ path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
              { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
              { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
              { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }*/
          ]
      }, 
      
      { path: 'noencontrado', component: NotfoundComponent },
      { path: '**', redirectTo: '/noencontrado' },
      ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
