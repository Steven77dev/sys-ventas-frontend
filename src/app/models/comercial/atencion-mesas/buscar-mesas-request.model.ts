export class BuscarMesasRequest{
    public local!: number;
    public entidad!: number;
    public fecha!: string;
    public estado!: string;

    constructor(local:number, entidad:number, fecha:string, estado:string){
        this.local = local;
        this.entidad = entidad;
        this.fecha = fecha;
        this.estado = estado;

    }
    
}