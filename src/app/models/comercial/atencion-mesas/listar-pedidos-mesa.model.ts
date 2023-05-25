export class PedidosMesaResponse {
    public nro!: number;
    public itemPedido!: number;
    public entidad!: number;
    public producto!: string;
    public desProducto!: string;
    public precio!: number;
    public cantidad!: number;
    public subTotal!: number;
    public saldoRojo!: number;
    public tipoProducto!: number;
    public estaAlmacen!: string;


    constructor() {
    }
}


export interface RootListarPedidosMesaResponse {
    codigo: number;
    respuesta: PedidosMesaResponse[];
    mensaje?: string;
}