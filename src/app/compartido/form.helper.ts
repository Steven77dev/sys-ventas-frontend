import { FormGroup } from '@angular/forms';  
import { UtilService } from '../servicios/util.service';

export class FormHelper { 
    utilService: UtilService = new UtilService();
    constructor(private formGroup: FormGroup) { }

    obtenerMensajeError(campo: string): string {
        const control = this.formGroup.get(campo);
        if (control)
            return this.utilService.obtenerMensajeError(control, campo);
        else { return '' }
    }

    obtenerMensajeErrorDefecto(): string {
        return this.utilService.obtenerMensajeErrorDefecto();
    }

    esCampoInvalido(campo: string): boolean {
        const control = this.formGroup.get(campo);
        if (control){
            return this.utilService.esCampoInvalido(control);
        }
        else { return false }
    }

    esClaseInvalido(campo: string): string {
        const control = this.formGroup.get(campo);
        if (control)
            return this.utilService.esCampoInvalido(control) ? 'ng-invalid ng-dirty' : '';
        else { return '' }
    }
}