import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { NG_VALIDATORS, NgControl } from '@angular/forms';

@Directive({
  selector: '[appValidacion]',
  providers: [{provide: NG_VALIDATORS, useExisting: ValidacionDirective, multi: true}]
})
export class ValidacionDirective {
    constructor(private el: ElementRef, private renderer: Renderer2, private ngControl: NgControl) {}

    @HostListener('change') onChange() {        
      this.aplicarClases();
    }
  
    private aplicarClases() {
      const control = this.ngControl.control;
      if (control) {
        const classes:any = {
          'ng-invalid': control.invalid && control.touched,
          'ng-dirty': control.dirty
        };
        Object.keys(classes).forEach((className) => {
          if (classes[className]) {
            this.renderer.addClass(this.el.nativeElement, className);
          } else {
            this.renderer.removeClass(this.el.nativeElement, className);
          }
        });
      }
    }
}