import { Component, OnInit } from '@angular/core';
import { request } from 'http';
import { CajaModel } from 'src/app/models/caja';
import { BuscarMesasRequest } from 'src/app/models/comercial/atencion-mesas/buscar-mesas-request.model';
import { MesasLocalResponse, RootListarMesasLocalResponse } from 'src/app/models/comercial/atencion-mesas/listar-mesas-response.model';
import { AtencionMesasService } from 'src/app/servicios/comercial/atencion-mesas/atencion-mesas.service';
@Component({ 
  templateUrl: './atencion-mesas.component.html'
})


export class AtencionMesasComponent implements OnInit {
  mesas!: MesasLocalResponse[]; 
  constructor(public atencionMesasService: AtencionMesasService) {
    
  }

  ngOnInit(): void {
    this.listarMesasLocal();
  }


  listarMesasLocal(){
    let request = new BuscarMesasRequest();
    request.entidad = 1;
    request.local = 1;
    request.fecha= "23/07/2023";
    request.estado="%";
    this.atencionMesasService.listadoMesasLocal(request).subscribe({
        next: (data: RootListarMesasLocalResponse) => { 
          if(data.codigo==0 ){
            this.mesas = data.respuesta;   
            console.log(this.mesas);
          } 
        },
        error: (errorResponse: any) => {
            this.mesas= [];
            console.log( errorResponse);
        },
        complete: () => {      
          
        },
       });
  }

}
