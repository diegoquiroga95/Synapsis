import { User } from "../../users";

export class Area
{    
    nombre:string;
    lider:number;
    miembros:User[];
    id_area:number;
    //fix sacar si se rompe algo con esto 25/08/2020
  id_user: any;
    
}
export class ModArea
{
    area:Area;
    nivel:number;
    legajo:number;
    id_area_mod:number;
    constructor (area?:Area,nivel?:number,legajo?:number,id_area?:number)
    {
        this.area=area;
        this.nivel=nivel;
        this.legajo=legajo;
        this.id_area_mod=id_area;
    }
}
export class ShowArea
{
    id_area:number;
    nombre:string;
    lider_n:string;
    lider_a:string;
}
export class SaveLAData
{
    leg:number;
    id_area:number;
    constructor (leg:number,id_area:number)
    {
        this.leg=leg;
        this.id_area=id_area;
    }
}