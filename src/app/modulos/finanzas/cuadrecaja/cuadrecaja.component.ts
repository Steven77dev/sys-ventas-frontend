import { Component, OnInit } from '@angular/core';
import { CajaModel } from 'src/app/models/caja';
@Component({ 
  templateUrl: './cuadrecaja.component.html'
})


export class CuadreCajaComponent implements OnInit {
  cajas!: CajaModel[];
  fechaApertura: Date = new Date();
  cajaSeleccionada!: CajaModel;
  constructor() {
    this.cajas = [
      { desCaja: 'Caja', codCaja: '1' },
      { desCaja: 'Caja 1', codCaja: '2' }
    ];
  }

  ngOnInit(): void {
  }

}
