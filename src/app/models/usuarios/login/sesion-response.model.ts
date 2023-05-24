export class SesionResponse{
    public estado!: number;
    public descripcion!: string;
    public sesion!:string;

    constructor(estado:number, descripcion:string, sesion:string){
        this.estado=estado;
        this.descripcion=descripcion;
        this.sesion=sesion;
    }

}


export interface RootObjectSesionResponse {
    codigo: number;
    respuesta: SesionResponse;
    mensaje?: string;
  }