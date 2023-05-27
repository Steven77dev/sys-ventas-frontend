import { AsignarMesaPedidoRequest } from "./asignar-mesa-pedido-request.model";

export class CrearPedidoRequest{

    public nombreCliente!: string;
    public personalAtencion!: string; 
    public fechaIngreso!: string;
    public montoTotal!: number;
    public observacion!:string;
    public cantPersonas!:number;
    public local!:number;
    public puntoAtencion!:number;
    public estado!:number;
    public session!:string;

    public asignarMesaPedido!:AsignarMesaPedidoRequest;

    constructor(nombreCliente:string, personalAtencion:string,fechaIngreso:string,montoTotal:number, observacion:string, 
        cantPersonas:number, local:number,puntoAtencion:number, estado:number, session:string,
        asignarMesaPedido: AsignarMesaPedidoRequest){
        this.nombreCliente = nombreCliente;
        this.personalAtencion = personalAtencion;
        this.fechaIngreso = fechaIngreso;
        this.montoTotal = montoTotal;
        this.observacion = observacion;
        this.cantPersonas = cantPersonas;
        this.local = local;
        this.puntoAtencion = puntoAtencion;
        this.estado=estado;
        this.session = session;
        this.asignarMesaPedido = asignarMesaPedido

    }
}