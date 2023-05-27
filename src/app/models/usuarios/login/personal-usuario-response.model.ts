export class PersonalUsuarioResponse{

    public persona!:string;
    public nombres!:string;
    public entidad!:string;
    public almacen!:string;
    public puntoAtencion!:string;
    public local!:string;
    public personal!:string;
    public nombreLocal!:string;

  

}


export interface RootObjectPersonalUsuarioResponse {
    codigo: number;
    respuesta: PersonalUsuarioResponse;
    mensaje?: string;
  }