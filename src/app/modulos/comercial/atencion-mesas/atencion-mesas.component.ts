import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Table } from 'primeng/table';
import { catchError, filter, finalize, map, of, tap } from 'rxjs';
import { CajaModel } from 'src/app/models/caja';
import { AgregarProductoPedidoRequest } from 'src/app/models/comercial/atencion-mesas/agregar-producto-pedido-request.model';
import { AsignarMesaPedidoRequest } from 'src/app/models/comercial/atencion-mesas/asignar-mesa-pedido-request.model';
import { BuscarMesasRequest } from 'src/app/models/comercial/atencion-mesas/buscar-mesas-request.model';
import { BuscarPedidosMesaRequest } from 'src/app/models/comercial/atencion-mesas/buscar-pedidos-mesa-request.model';
import { BuscarProductosPorPedirRequest } from 'src/app/models/comercial/atencion-mesas/buscar-productos-pedir-request.model';
import { CrearPedidoRequest } from 'src/app/models/comercial/atencion-mesas/crear-pedido-request.model';
import { MesasLocalResponse, RootListarMesasLocalResponse } from 'src/app/models/comercial/atencion-mesas/listar-mesas-response.model';
import { PedidosMesaResponse, RootListarPedidosMesaResponse } from 'src/app/models/comercial/atencion-mesas/listar-pedidos-mesa.model';
import { ProductosPorPedirResponse, RootListarProductosPorPedirResponse } from 'src/app/models/comercial/atencion-mesas/listar-productos-pedir.model'; 
import { BuscarAperturaCajaRequest } from 'src/app/models/finanzas/cuadrecaja/buscar-apertura-caja-request.model';
import { AtencionMesasService } from 'src/app/servicios/comercial/atencion-mesas/atencion-mesas.service'; 
import { FechaConversionService } from 'src/app/servicios/compartido/fecha.service';
import { MensajesToastService } from 'src/app/servicios/compartido/mensajes-toast.service';
import { IngresoDiarioService } from 'src/app/servicios/finanzas/ingresos/ingreso-diario.service';
@Component({
  templateUrl: './atencion-mesas.component.html',
  styleUrls: ['./atencion-mesas.component.css'],
  providers: [FechaConversionService, MensajesToastService]

})


export class AtencionMesasComponent implements OnInit {
  mesas!: MesasLocalResponse[];
  productosPorPedir!: ProductosPorPedirResponse[];
  pedidosMesa: PedidosMesaResponse[] = [];
  mesaSeleccionada!: MesasLocalResponse;
  mostrarModalPedido: boolean = false;
  mostrarModalAgregarCliente: boolean = false;
  mostrarConfirmarAnulacion:boolean = false;
  mostrarCobrarPrincipal:boolean = false;
  mostrarDsctoGlobal:boolean = false;
  fechaActual = new Date();
  fechaFormateada: string = "";
  accionesPedido!: any[];
  accionPedido!: any;
  cantidadPedido: string = '';
  loading: boolean = true;
  verificarApertura: boolean =true;
  listadoDsctos!: CajaModel[];
  dsctoSeleccionado!: CajaModel;

  metodosPagos!: any[];
  metodoPagoSeleccionado!: any;

  listadoPagos!: any[];
  @ViewChild('dt1') dt1!: Table;
  selectedProducto!: ProductosPorPedirResponse;
  buttonGroups: number[][] = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 0]
  ];

  montoTotalPagar:number=0.00;
  montoFaltante:number=0.00;
  constructor(
    public atencionMesasService: AtencionMesasService, 
    private mensajeToast: MensajesToastService,
    public dateService: FechaConversionService,
    public confirmationService: ConfirmationService,
    public ingresoDiarioService: IngresoDiarioService

  ) {
    /*this.entidadSesion = localStorage.getItem("entidad") || '0';
    this.localSesion = localStorage.getItem("local") || '0';
    this.almacenSesion = localStorage.getItem("almacen") || '0';
    this.codPersonalSesion = localStorage.getItem("codPersonal") || '';
    this.ptoAtencionSesion = localStorage.getItem("ptoAtencion") || '';*/
    this.fechaActual = new Date();
    this.fechaFormateada = this.dateService.formatearFechaDDYYMMM(this.fechaActual);
    
  
  }
  botonesAccionesPedido() {
    this.accionesPedido = [
      { id: 1, icon: 'pi pi-user-plus', texto: 'Agregar cliente', classBtn: 'p-button-secondary' },
      { id: 2, icon: 'pi pi-print', texto: 'Comanda', classBtn: 'p-button-secondary' },
      { id: 3, icon: 'pi pi-shopping-cart', texto: 'Cobrar', classBtn: 'p-button-success' },
      { id: 4, icon: 'pi pi-plus', texto: 'Descuento', classBtn: 'p-button-info' },
      { id: 5, icon: 'pi pi-ban', texto: 'Anular', classBtn: 'p-button-danger' },
    ];
  }

  botonesMetodoPago(){
    this.metodosPagos = [
      { id: 1, icon: 'pi pi-money-bill', texto: 'Efectivo', classBtn: 'p-button-secondary' },
      { id: 2, icon: 'pi pi-credit-card', texto: 'Tarjeta', classBtn: 'p-button-secondary' },
      { id: 3, icon: 'pi pi-table', texto: 'Otros', classBtn: 'p-button-secondary' }
    ];
    this.metodoPagoSeleccionado = this.metodosPagos[0];
  }

  accionPedidoMesa(button: any) {
    //acción agregar cliente        
    if (button.id == 1) {
      this.mostrarModalAgregarCliente = true;
    } else if(button.id==5){
      this.mostrarConfirmarAnulacion = true;
    
    } else if(button.id==3){
      this.mostrarCobrarPrincipal = true;
      this.botonesMetodoPago();
     // this.metodoPagoSeleccionado.id= 1;
    } else if(button.id==4){
      this.mostrarDsctoGlobal = true;
    }
  } 

  ngOnInit(): void {
    this.verificarAperturaCaja();
    
  }

  seleccionarMesa(seleccionarMesa: MesasLocalResponse) {
    this.selectedProducto = new ProductosPorPedirResponse();
    this.pedidosMesa = [];
    this.mesaSeleccionada = seleccionarMesa;
    this.mostrarModalPedido = true;
    if (this.mesaSeleccionada.nroPedido != null || this.mesaSeleccionada.seriePedido != null) {
      this.listarPedidosPorMesa(this.mesaSeleccionada.seriePedido, this.mesaSeleccionada.nroPedido);
      this.calcularMontoTotal();
    }  
    this.botonesAccionesPedido();
  }

  listarMesasLocal() {
    this.loading = true;
    let request = new BuscarMesasRequest(0, 0, this.fechaFormateada, "%");
    this.atencionMesasService.listadoMesasLocal(request).pipe(
      filter((response: RootListarMesasLocalResponse) => response.codigo === 0),
      tap((response: RootListarMesasLocalResponse) => {
        this.mesas = response.respuesta;
      }),
      catchError((error: any) => {
        this.mesas = [];
        return of(error);  
      }),
      finalize(() => {
        this.loading = false;
      })
    ).subscribe();
  }

  listarProductosPorPedir() {
    this.loading = true;
    let request = new BuscarProductosPorPedirRequest("", 0, "", "%");
    this.atencionMesasService.listadoProductosPorPedir(request).pipe(
      tap((data: RootListarProductosPorPedirResponse) => {
        if (data.codigo === 0) {
          this.productosPorPedir = data.respuesta;
        }
      }),
      catchError((error: any) => {
        this.productosPorPedir = [];
        return of(error);
      }),
      tap({
        complete: () => {
         this.loading = false;
        }
      })
    ).subscribe();
  }

  seleccionarProducto(event: any) {
    this.cantidadPedido = '0';
    this.selectedProducto = event.data;
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

  listarPedidosPorMesa(seriePedido: string, nroPedido: string) {
    this.loading = true;
    let itemPedido = 0;
    let request = new BuscarPedidosMesaRequest(seriePedido, nroPedido, itemPedido, "","");
    request.seriePedido = seriePedido;
    request.nroPedido = nroPedido;

    this.atencionMesasService.listadoPedidosPorMesa(request).subscribe({
      next: (data: RootListarPedidosMesaResponse) => {
        if (data.codigo == 0) {
          this.pedidosMesa = data.respuesta;
        }
      },
      error: (errorResponse: any) => {

      },
      complete: () => {
        this.calcularMontoTotal();
        this.loading = false;
      },
    });
  }

  cobrarMesa(event: Event, mesa: MesasLocalResponse) {
    event.stopPropagation();
    this.mesaSeleccionada = mesa;
    this.mostrarCobrarPrincipal = true;
  }

  agregarPedido() {
    if (this.cantidadPedido == '') {
      this.mensajeToast.showWarn('Advertencia', 'Debe agregar un dígito válido.')
    } else {
      if (this.mesaSeleccionada.nroPedido != null || this.mesaSeleccionada.seriePedido != null) {
        this.actualizarProductosPedido();
      }
      else {
        this.crearPedido();
      }
    }
  }

  crearPedido() {
    this.loading = true;
    let asignarMesaPedidoRequest = new AsignarMesaPedidoRequest("", "", 0,0, this.mesaSeleccionada.codMesa, 1, "");
    let request = new CrearPedidoRequest("", "", this.fechaFormateada, 0, "", 0, 0, 0, 76,"", asignarMesaPedidoRequest);
    this.atencionMesasService.crearPedido(request).subscribe({
      next: (data: any) => {
        if (data.codigo == 0) {
          this.mesaSeleccionada.nroPedido = data.respuesta.nroPedido;
          this.mesaSeleccionada.seriePedido = data.respuesta.seriePedido;
          this.actualizarProductosPedido();
          //this.listarPedidosPorMesa(this.mesaSeleccionada.seriePedido, this.mesaSeleccionada.nroPedido);
        }
      },
      error: (errorResponse: any) => {
        this.mesas = [];
      },
      complete: () => {
       
        this.loading = false;
      },
    });
  }

  verificarAperturaCaja(){
    this.loading = true;
    let request = new BuscarAperturaCajaRequest("",this.fechaFormateada);
    this.ingresoDiarioService.verficarAperturaCaja(request).subscribe({
      next: (data: any) => {
        if (data.codigo == 0) {
          this.verificarApertura = data.respuesta.apertura;
          if(this.verificarApertura){
            this.listarMesasLocal();
            this.listarProductosPorPedir();
          }
          
        }
      },
      error: (errorResponse: any) => {

      },
      complete: () => {
          this.loading = false;
      },
    });

  }
  actualizarProductosPedido() {
    this.loading = true;
    let request = new AgregarProductoPedidoRequest(this.mesaSeleccionada.seriePedido, this.mesaSeleccionada.nroPedido,
      "", this.selectedProducto.producto, this.selectedProducto.precio, parseInt(this.cantidadPedido), this.selectedProducto.precio * parseInt(this.cantidadPedido), 1, "");
    this.atencionMesasService.agregarProductoPedido(request).subscribe({
      next: (data: any) => {
        if (data.codigo == 0) {
          this.mensajeToast.showSuccess("Producto agregado", this.selectedProducto.desProducto);
          this.listarPedidosPorMesa(this.mesaSeleccionada.seriePedido, this.mesaSeleccionada.nroPedido);
        }
      },
      error: (errorResponse: any) => {
        this.mesas = [];
      },
      complete: () => {
        this.calcularMontoTotal();
        this.selectedProducto = new ProductosPorPedirResponse();
        this.cantidadPedido = '0';
        this.loading = false;
      },
    });
  }

  calcularMontoTotal(){
    for(let pedidoItem of this.pedidosMesa){
        this.montoTotalPagar =  this.montoTotalPagar + pedidoItem.subTotal;
    }
    console.log(this.montoTotalPagar);
  }

  limpiarCalculadora() {
    // Lógica para limpiar el campo de entrada de texto
    this.cantidadPedido = '';
  }

  seleccionarNumero(numero: number) {
    this.cantidadPedido = this.cantidadPedido + numero;

  }
}
