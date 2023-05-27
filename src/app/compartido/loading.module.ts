import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LoadingComponent } from './loading/loading.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@NgModule({
  declarations: [LoadingComponent],
  exports: [LoadingComponent], // Exporta el LoadingComponent para que esté disponible en otros módulos
  imports: [CommonModule, ProgressSpinnerModule],
})
export class LoadingModule {}