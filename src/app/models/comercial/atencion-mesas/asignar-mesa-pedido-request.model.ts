export class AsignarMesaPedidoRequest{

    public seriePedido!: string;
    public nroPedido!: string; 
    public entidad!: number;
    public local!: number;
    public nroMesa!:number;
    public estado!:number;
    public session!:string;


    constructor(seriePedido:string, nroPedido:string, entidad:number, local:number, nroMesa:number, estado:number, session:string){
        this.seriePedido = seriePedido;
        this.nroPedido = nroPedido;
        this.entidad = entidad;
        this.local = local;
        this.nroMesa = nroMesa;
        this.estado = estado;
        this.session = session;

    }
}