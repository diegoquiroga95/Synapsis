export class Tarea
{
    id_tarea:number;
    subtarea_de_id:number;
    titulo:string;
    id_area:number;
    id_responsable:number;
    nro_regresion:number;
    estado:number;
    legajo:number;
    tiempo_estimado:string;
    tiempo_real:string;
    prioridad:any;
    tipo_tarea:string;
    constructor (
        id_tarea?:number,
        subtarea_de_id?:number,
        titulo?:string,
        id_area?:number,
        id_responsable?:number,
        nro_regresion?:number,
        estado?:number,
        legajo?:number,
        tiempo_estimado?:string,
        tiempo_real?:string,
        prioridad?:any,
        tipo_tarea?:string)
    {
        this.id_tarea=id_tarea;
        this.subtarea_de_id =subtarea_de_id;
        this.titulo=titulo;
        this.id_area=id_area;
        this.id_responsable=id_responsable;
        this.nro_regresion=nro_regresion;
        this.estado=estado;
        this.tiempo_estimado=tiempo_estimado;
        this.tiempo_real=tiempo_real;
        this.legajo=legajo;
        this.prioridad=prioridad;
        this.tipo_tarea=tipo_tarea;
    }
}
export class ShowTarea
{
    id_tarea:number;
    titulo:string;
    id_area:number;
    responsable_n:string;
    responsable_a:string;
    nro_regresion:number;
    estado:string;
    tiempo_estimado:string;
    tiempo_real:string;
    prior:number;
}
export class ShowTareaGantt
{
    id:number;
    text:string;
    start_date:string;
    parent:string;
    responsable_n:string;
    responsable_a:string;
    nro_regresion:number;
    estado:string;
    duration:string;
    progress:string
    tiempo_real:string;
}
export class InputTarea
{
    titulo:string;
    id_responsable:number;
    estado:number;
    tiempo_estimado:string;
    prioridad:any;
  subtarea_de_id: any;
}
export class ModTarea {
    tarea: Tarea;
    id_user: number;
    constructor(tarea:Tarea,id_user:number)
    {
        this.tarea=tarea,
        this.id_user=id_user
    }

}