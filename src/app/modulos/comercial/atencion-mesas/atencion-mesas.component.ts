import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { AgregarProductoPedidoRequest } from 'src/app/models/comercial/atencion-mesas/agregar-producto-pedido-request.model';
import { AsignarMesaPedidoRequest } from 'src/app/models/comercial/atencion-mesas/asignar-mesa-pedido-request.model';
import { BuscarMesasRequest } from 'src/app/models/comercial/atencion-mesas/buscar-mesas-request.model';
import { BuscarPedidosMesaRequest } from 'src/app/models/comercial/atencion-mesas/buscar-pedidos-mesa-request.model';
import { BuscarProductosPorPedirRequest } from 'src/app/models/comercial/atencion-mesas/buscar-productos-pedir-request.model';
import { CrearPedidoRequest } from 'src/app/models/comercial/atencion-mesas/crear-pedido-request.model';
import { MesasLocalResponse, RootListarMesasLocalResponse } from 'src/app/models/comercial/atencion-mesas/listar-mesas-response.model';
import { PedidosMesaResponse, RootListarPedidosMesaResponse } from 'src/app/models/comercial/atencion-mesas/listar-pedidos-mesa.model';
import { ProductosPorPedirResponse, RootListarProductosPorPedirResponse } from 'src/app/models/comercial/atencion-mesas/listar-productos-pedir.model'; 
import { AtencionMesasService } from 'src/app/servicios/comercial/atencion-mesas/atencion-mesas.service'; 
import { FechaConversionService } from 'src/app/servicios/compartido/fecha.service';
@Component({
  templateUrl: './atencion-mesas.component.html',
  styleUrls: ['./atencion-mesas.component.css'],
  providers: [FechaConversionService]

})


export class AtencionMesasComponent implements OnInit {
  mesas!: MesasLocalResponse[];
  productosPorPedir!: ProductosPorPedirResponse[];
  pedidosMesa!: PedidosMesaResponse[];
  mesaSeleccionada!: MesasLocalResponse;
  mostrarModalPedido: boolean = false;
  mostrarModalAgregarCliente: boolean = false;
  fechaActual = new Date();
  fechaFormateada: string = "";
  accionesPedido!: any[];
  accionPedido!: any;
  cantidadPedido: string = '';
  loading: boolean = true;
  entidadSesion!: any;
  localSesion!: any;
  almacenSesion!: any;
  codPersonalSesion!: string;
  ptoAtencionSesion!: any;
  @ViewChild('dt1') dt1!: Table;
  selectedProducto!: ProductosPorPedirResponse;
  buttonGroups: number[][] = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 0]
  ];


  constructor(
    public atencionMesasService: AtencionMesasService, 
    public dateService: FechaConversionService 

  ) {
    this.entidadSesion = localStorage.getItem("entidad") || '0';
    this.localSesion = localStorage.getItem("local") || '0';
    this.almacenSesion = localStorage.getItem("almacen") || '0';
    this.codPersonalSesion = localStorage.getItem("codPersonal") || '';
    this.ptoAtencionSesion = localStorage.getItem("ptoAtencion") || '';
    this.fechaActual = new Date();
    this.fechaFormateada = this.dateService.formatearFechaDDYYMMM(this.fechaActual);
    this.listarProductosPorPedir();
  }
  botonesAccionesPedido() {
    this.accionesPedido = [
      { id: 1, icon: 'pi pi-user-plus', texto: 'Agregar cliente', classBtn: 'p-button-secondary' },
      { id: 2, icon: 'pi pi-print', texto: 'Comanda', classBtn: 'p-button-secondary' },
      { id: 3, icon: 'pi pi-shopping-cart', texto: 'Cobrar', classBtn: 'p-button-success' },
      { id: 4, icon: 'pi pi-ban', texto: 'Anular', classBtn: 'p-button-danger' },
    ];
  }

  accionPedidoMesa(button: any) {
    //acción agregar cliente        
    if (button.id == 1) {
      this.mostrarModalAgregarCliente = true;
    }
  }
  ngOnInit(): void {
    this.listarMesasLocal();
    this.loading = false;

  }

  listarMesasLocal() {
    let request = new BuscarMesasRequest(parseInt(this.localSesion), parseInt(this.entidadSesion), this.fechaFormateada, "%");
    this.atencionMesasService.listadoMesasLocal(request).subscribe({
      next: (data: RootListarMesasLocalResponse) => {
        if (data.codigo == 0) {
          this.mesas = data.respuesta;
        }
      },
      error: (errorResponse: any) => {
        this.mesas = [];
      },
      complete: () => {

      },
    });
  }

  listarProductosPorPedir() {
    let request = new BuscarProductosPorPedirRequest(this.almacenSesion, parseInt(this.entidadSesion), this.localSesion, "%");
    this.atencionMesasService.listadoProductosPorPedir(request).subscribe({
      next: (data: RootListarProductosPorPedirResponse) => {
        if (data.codigo == 0) {
          this.productosPorPedir = data.respuesta;
        }
      },
      error: (errorResponse: any) => {
        this.productosPorPedir = [];
      },
      complete: () => {

      },
    });
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
    let itemPedido = 0;
    let request = new BuscarPedidosMesaRequest(seriePedido, nroPedido, itemPedido, this.entidadSesion, this.almacenSesion);
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

      },
    });
  }

  seleccionarMesa(seleccionarMesa: MesasLocalResponse) {
    this.pedidosMesa = [];
    this.mesaSeleccionada = seleccionarMesa;
    this.mostrarModalPedido = true;
    if (this.mesaSeleccionada.nroPedido != null || this.mesaSeleccionada.seriePedido != null) {
      this.listarPedidosPorMesa(this.mesaSeleccionada.seriePedido, this.mesaSeleccionada.nroPedido);
    }

    //this.listarProductosPorPedir();
    this.botonesAccionesPedido();
  }

  cobrarMesa(event: Event, mesa: MesasLocalResponse) {
    event.stopPropagation();
  }

  agregarPedido() {
    if (this.cantidadPedido == '') {
      alert("no puede agregar.");
    }
    if (this.mesaSeleccionada.nroPedido != null || this.mesaSeleccionada.seriePedido != null) {
      this.actualizarProductosPedido();
    }
    else {
      this.crearPedido();
    }




  }

  crearPedido() {
    let asignarMesaPedidoRequest = new AsignarMesaPedidoRequest("", "", parseInt(this.entidadSesion), parseInt(this.localSesion), this.mesaSeleccionada.codMesa, 1, localStorage.getItem("token")?.toString() || '');
    let request = new CrearPedidoRequest("", this.codPersonalSesion, this.fechaFormateada, 0, "", 0, this.localSesion, this.ptoAtencionSesion, 76, localStorage.getItem("token")?.toString() || '', asignarMesaPedidoRequest);
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
        this.selectedProducto = new ProductosPorPedirResponse();
      },
    });
  }

  actualizarProductosPedido() {
    let request = new AgregarProductoPedidoRequest(this.mesaSeleccionada.seriePedido, this.mesaSeleccionada.nroPedido,
      this.entidadSesion, this.selectedProducto.producto, this.selectedProducto.precio, parseInt(this.cantidadPedido), this.selectedProducto.precio * parseInt(this.cantidadPedido), 1, localStorage.getItem("token") || '');
    this.atencionMesasService.agregarProductoPedido(request).subscribe({
      next: (data: any) => {
        if (data.codigo == 0) {
          this.listarPedidosPorMesa(this.mesaSeleccionada.seriePedido, this.mesaSeleccionada.nroPedido);
        }
      },
      error: (errorResponse: any) => {
        this.mesas = [];
      },
      complete: () => {
        this.selectedProducto = new ProductosPorPedirResponse();
        this.cantidadPedido = '0';
      },
    });
  }

  limpiarCalculadora() {
    // Lógica para limpiar el campo de entrada de texto
    this.cantidadPedido = '';
  }

  seleccionarNumero(numero: number) {
    this.cantidadPedido = this.cantidadPedido + numero;

  }
}
