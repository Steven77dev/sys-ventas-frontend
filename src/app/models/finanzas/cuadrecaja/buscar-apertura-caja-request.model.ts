export class BuscarAperturaCajaRequest{
    public local!:string;
    public desFecha!:string;

    constructor(local:string, desFecha:string){
        this.local = local;
        this.desFecha = desFecha;
    }
}