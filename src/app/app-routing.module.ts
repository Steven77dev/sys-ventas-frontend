import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuadreCajaComponent } from './ingresos/cuadre-caja/cuadre-caja.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'cuadre-caja', component: CuadreCajaComponent },
  // Agrega aquí las demás rutas de tu aplicación
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
