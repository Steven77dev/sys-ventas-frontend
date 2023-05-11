import { Component, OnInit } from '@angular/core'; 
import { CajaModel } from 'src/app/models/caja';
@Component({
  selector: 'app-cuadre-caja',
  templateUrl: './cuadre-caja.component.html',
  styleUrls: ['./cuadre-caja.component.css']
})


export class CuadreCajaComponent implements OnInit {
  cajas!: CajaModel[];

    cajaSeleccionada!: CajaModel;
  constructor() { 
    this.cajas = [
      {desCaja: 'Caja', codCaja: '1'}
  ];
  }

  ngOnInit(): void {
  }

}
