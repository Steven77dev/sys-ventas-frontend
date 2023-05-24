export class IniciarSesionRequest{
    public usuario!: string;
    public password!: string;
    public ip!: string;

    constructor(usuario: string, password: string ){
        this.usuario = usuario;
        this.password = password;
    }
}