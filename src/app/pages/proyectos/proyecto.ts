import { User } from "../../users";

export class Proyecto
{
    nombre: string;
    legajo: number;
    cliente: User;
    miembros:User[];
    estado:number;
    idcliente: string;
    idEstado: string;
    fecha_inicio:string;
}
export class NewProyecto
{    
    proy:Proyecto;
    user:number;
    constructor(proy?:Proyecto,ul?:number)
    {
        this.proy=proy;
        this.user=ul;
    }
}
export class ModProyecto
{    
    proy:Proyecto;
    user:number;
    leg:number;
    constructor(proy?:Proyecto,ul?:number,leg?:number)
    {
        this.proy=proy;
        this.user=ul;
        this.leg=leg;
    }
}
