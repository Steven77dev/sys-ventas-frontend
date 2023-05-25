export class MesasLocalResponse{
    public codMesa!:number;
    public desMesa!:string;
    public seriePedido!:string;
    public  nroPedido!:string;
    public  codEstadoRegistro!:string;
    public  desEstadoRegistro!:string;
    public  mesaPrincipal!:string;
    public puntoAtencion!:string;
    public  montoTotal:string="0.00";
    public  desCliente!:string;
    public  cantidad!:string;

    constructor(codMesa:number, desMesa:string, seriePedido:string, nroPedido:string,codEstadoRegistro:string , desEstadoRegistro:string,
        mesaPrincipal:string, puntoAtencion:string ,montoTotal:string ,desCliente:string , cantidad:string){
        this.codMesa = codMesa;
        this.desMesa = desMesa;
        this.seriePedido = seriePedido;
        this.nroPedido = nroPedido;
        this.codEstadoRegistro = codEstadoRegistro;
        this.desEstadoRegistro = desEstadoRegistro;
        this.mesaPrincipal = mesaPrincipal;
        this.puntoAtencion = puntoAtencion;
        this.montoTotal = montoTotal;
        this.desCliente = desCliente;
        this.cantidad = cantidad;
    }

}


export interface RootListarMesasLocalResponse {
    codigo: number;
    respuesta: MesasLocalResponse[];
    mensaje?: string;
  }