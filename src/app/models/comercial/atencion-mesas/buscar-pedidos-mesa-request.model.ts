export class BuscarPedidosMesaRequest{

    public seriePedido!: string;
    public nroPedido!: string;
    public itemPedido!: number; 
    public entidad!: string;
    public almacen!: string;

    constructor(seriePedido:string, nroPedido:string, itemPedido:number, entidad:string, almacen:string){
        this.seriePedido = seriePedido;
        this.nroPedido = nroPedido;
        this.itemPedido = itemPedido;
        this.entidad = entidad;
        this.almacen = almacen;

    }
}