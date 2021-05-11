export class UserLog
{
    nombre: string;
    apellido: string;
    passwd: string;
    empresa:number;
    mail:string;
    telefono:number;
    profesion:string; 
    id_tipo_usuario:number; 
}
export class User
{
    id_user:number;
    nombre:string;
    apellido:string;
    id_tipo_usuario:number;
    empresa:number;
    mail:string;
    telefono:number;
    profesion:string;
    cv:string;
}
export class UserResponse
{
    constructor(user:User)
    {
        this.usr=user;
    }
    error:boolean;
    error_msg:string;
    usr:User;
}
export class ModUser
{
    constructor(user:User,id_user:number)
    {
        this.user=user;
        this.id_user=id_user;
    }
    user:User;
    id_user:number;
}