import { Component, OnInit } from '@angular/core'; 
import { BuscarMesasRequest } from 'src/app/models/comercial/atencion-mesas/buscar-mesas-request.model';
import { BuscarPedidosMesaRequest } from 'src/app/models/comercial/atencion-mesas/buscar-pedidos-mesa.model';
import { MesasLocalResponse, RootListarMesasLocalResponse } from 'src/app/models/comercial/atencion-mesas/listar-mesas-response.model';
import { PedidosMesaResponse, RootListarPedidosMesaResponse } from 'src/app/models/comercial/atencion-mesas/listar-pedidos-mesa.model';
import { AtencionMesasService } from 'src/app/servicios/comercial/atencion-mesas/atencion-mesas.service';
import { PedidosPorMesaService } from 'src/app/servicios/comercial/pedidos-por-mesa.service';
@Component({ 
  templateUrl: './atencion-mesas.component.html',
  styleUrls: ['./atencion-mesas.component.css']
})


export class AtencionMesasComponent implements OnInit {
  mesas!: MesasLocalResponse[]; 
  pedidosMesa!: PedidosMesaResponse[];
  mesaSeleccionada!: MesasLocalResponse;
  mostrarModalPedido:boolean = false;
 
  cantidadPedido: string = '1';
  buttonGroups: number[][] = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 0]
  ];
  constructor(public atencionMesasService: AtencionMesasService, public pedidosMesaService: PedidosPorMesaService) {
    
  }

  ngOnInit(): void {
    this.listarMesasLocal();
  }

  listarMesasLocal(){
    let request = new BuscarMesasRequest();
    request.entidad = 1;
    request.local = 1;
    request.fecha= "24/05/2023";
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

  listarPedidosPorMesa(seriePedido: string, nroPedido: string){
    let request = new BuscarPedidosMesaRequest();
    request.seriePedido=seriePedido;
    request.nroPedido=nroPedido;
    request.itemPedido=0;
    request.entidad = "1";
    request.almacen = "1";

    this.pedidosMesaService.listadoPedidosPorMesa(request).subscribe({
        next: (data: RootListarPedidosMesaResponse) => { 
          if(data.codigo==0 ){
            this.pedidosMesa = data.respuesta;   
            console.log(this.pedidosMesa);
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
  seleccionarMesa(seleccionarMesa: MesasLocalResponse){ 
       this.mesaSeleccionada = seleccionarMesa;
        this.mostrarModalPedido = true;
        this.listarPedidosPorMesa(this.mesaSeleccionada.seriePedido, this.mesaSeleccionada.nroPedido);
  }
  
  cobrarMesa(event: Event, mesa : MesasLocalResponse){
    event.stopPropagation(); 
  }

  agregar() {
    // Lógica para agregar el número ingresado
    console.log('Número agregado:', this.cantidadPedido);
    // ...
  }

  limpiar() {
    // Lógica para limpiar el campo de entrada de texto
    this.cantidadPedido = '';
  }

  seleccionarNumero(numero: number) {
    // Lógica para seleccionar un número del botón
    console.log('Número seleccionado:', numero);
    // ...
  }
}
