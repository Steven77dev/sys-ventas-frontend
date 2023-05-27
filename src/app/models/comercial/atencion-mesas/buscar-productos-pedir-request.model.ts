export class BuscarProductosPorPedirRequest{
    public almacen!: string;
    public entidad!: number;
    public local!: string;
    public familia!: string;

    constructor(almacen:string, entidad:number, local:string, familia:string){
        this.almacen = almacen;
        this.entidad = entidad;
        this.local = local;
        this.familia = familia;

    }
    
}