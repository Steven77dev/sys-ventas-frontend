export class ProductosPorPedirResponse {
    public producto!: string;
    public desProducto!: string;
    public precio!: number;
    public saldo!: number;
    public precioFormateado!: string;
    public tipoProducto!: number;
    public desFamilia!: string;


    constructor() {
    }
}


export interface RootListarProductosPorPedirResponse {
    codigo: number;
    respuesta: ProductosPorPedirResponse[];
    mensaje?: string;
}