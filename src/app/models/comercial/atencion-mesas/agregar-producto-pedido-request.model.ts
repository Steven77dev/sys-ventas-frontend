export class AgregarProductoPedidoRequest{

    public seriePedido!: string;
    public nroPedido!: string;
    public entidad!: string;
    public producto!: string;
    public precio!:number;
    public cantidad!:number;
    public subtotal!:number;
    public estado!:number;
    public session!:string;

    constructor(seriePedido:string, nroPedido:string, entidad:string, producto:string, precio:number, cantidad:number, subtotal:number, estado:number, session:string){
        this.seriePedido = seriePedido;
        this.nroPedido = nroPedido;
        this.entidad = entidad;
        this.producto = producto;
        this.precio = precio;
        this.cantidad = cantidad;
        this.subtotal = subtotal;
        this.estado = estado;
        this.session = session;

    }
}