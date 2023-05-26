import { Component, OnInit, ViewChild } from '@angular/core'; 
import { Table } from 'primeng/table';
import { BuscarMesasRequest } from 'src/app/models/comercial/atencion-mesas/buscar-mesas-request.model';
import { BuscarPedidosMesaRequest } from 'src/app/models/comercial/atencion-mesas/buscar-pedidos-mesa.model';
import { BuscarProductosPorPedirRequest } from 'src/app/models/comercial/atencion-mesas/buscar-productos-pedir-request.model';
import { MesasLocalResponse, RootListarMesasLocalResponse } from 'src/app/models/comercial/atencion-mesas/listar-mesas-response.model';
import { PedidosMesaResponse, RootListarPedidosMesaResponse } from 'src/app/models/comercial/atencion-mesas/listar-pedidos-mesa.model';
import { ProductosPorPedirResponse, RootListarProductosPorPedirResponse } from 'src/app/models/comercial/atencion-mesas/listar-productos-pedir.model';
import { AtencionMesasService } from 'src/app/servicios/comercial/atencion-mesas/atencion-mesas.service';
import { PedidosPorMesaService } from 'src/app/servicios/comercial/atencion-mesas/pedidos-por-mesa.service';
import { ProductosPedirService } from 'src/app/servicios/comercial/atencion-mesas/productos-pedir.service';
import { FechaConversionService } from 'src/app/servicios/compartido/fecha.service';
@Component({ 
  templateUrl: './atencion-mesas.component.html',
  styleUrls: ['./atencion-mesas.component.css'],
  providers:[FechaConversionService]
  
})


export class AtencionMesasComponent implements OnInit {
  mesas!: MesasLocalResponse[]; 
  productosPorPedir!: ProductosPorPedirResponse[];
  pedidosMesa!: PedidosMesaResponse[];
  mesaSeleccionada!: MesasLocalResponse;
  mostrarModalPedido:boolean = false;
  mostrarModalAgregarCliente:boolean = false;
  fechaActual = new Date();
  fechaFormateada: string="";
  accionesPedido!: any[];
  accionPedido!:any;
  cantidadPedido: string = '1';
  loading: boolean = true;
  
  @ViewChild('dt1') dt1!: Table;
  buttonGroups: number[][] = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 0]
  ];


  constructor(public atencionMesasService: AtencionMesasService, public pedidosMesaService: PedidosPorMesaService,
    public dateService : FechaConversionService, public productosPorPedirService: ProductosPedirService
   
    ) {
        this.fechaActual = new Date();
        this.fechaFormateada = this.dateService.formatearFechaDDYYMMM(this.fechaActual);
    }
  botonesAccionesPedido(){
    this.accionesPedido = [
        {id: 1, icon: 'pi pi-user-plus', texto: 'Agregar cliente',classBtn:'p-button-secondary'},
        {id: 2, icon: 'pi pi-print', texto: 'Comanda',classBtn:'p-button-secondary'},
        {id: 3, icon: 'pi pi-shopping-cart', texto: 'Cobrar',classBtn:'p-button-success'},
        {id: 4, icon: 'pi pi-ban', texto: 'Anular',classBtn:'p-button-danger'},
    ];
  }

  accionPedidoMesa(button:any){
    //acción agregar cliente        
    if(button.id==1){
        this.mostrarModalAgregarCliente= true;
    }
  }
  ngOnInit(): void {
    this.listarMesasLocal();
    this.loading = false;
  }

  listarMesasLocal(){
    let request = new BuscarMesasRequest();
    request.entidad = 1;
    request.local = 1;
    console.log(this.fechaFormateada)
    request.fecha= this.fechaFormateada;
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

  listarProductosPorPedir(){
    let request = new BuscarProductosPorPedirRequest();
    request.entidad = 1;
    request.local = "1";
    request.almacen="1"; 
    request.familia="%";
    this.productosPorPedirService.listadoProductosPorPedir(request).subscribe({
        next: (data: RootListarProductosPorPedirResponse) => { 
          if(data.codigo==0 ){
            this.productosPorPedir = data.respuesta;   
            console.log(this.mesas);
          } 
        },
        error: (errorResponse: any) => {
            this.productosPorPedir= [];
            console.log( errorResponse);
        },
        complete: () => {      
          
        },
       });
  }

  limpiarFiltrado(table: Table) {
    table.clear();
}

filtrarTabla(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value || '';
    if (this.dt1) {
      this.dt1.filterGlobal(value, 'contains');
    }
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
        this.listarProductosPorPedir();
        this.botonesAccionesPedido();
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
