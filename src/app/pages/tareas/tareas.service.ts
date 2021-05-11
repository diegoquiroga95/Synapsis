import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Tarea, ShowTarea, ModTarea, InputTarea, ShowTareaGantt } from './tareas';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoTarea } from './estado_tarea';
import { SaveLAData } from '../areas/area';
import * as moment from 'moment';
import "moment-timezone";
import { RegisterService } from '../../register.service';
import { root_endpoint } from "../../enpoint";
import { Archivos,Files } from '../areas/archivos/archivos';
@Injectable({
  providedIn: 'root'
})

export class TareasService {
t:any;
tareasUser:any
ELEMENT_DATA: Files[] = [];
_subcriptionF:Subscription;
_subscriptionTarea:Subscription;

  constructor(
    private http:HttpClient,
    private reg:RegisterService
  ) { }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

 

  getFilesFromTask(id_tarea:number):Observable<Archivos[]>{
    console.log("paso1");
    let url=root_endpoint+"archXtask_last_version.php?id_tarea="+id_tarea;
    return this.http.get<Archivos[]>(url);
  }

  testT(id_tarea:number){
    console.log("paso2");
    this._subcriptionF = this.getFilesFromTask(id_tarea).subscribe(
      res=>{
        this.t = res;
        this.ELEMENT_DATA = res;
        console.log(this.t)
       
      }
    )
  }

  testTu(id_tarea:number){
    console.log("paso3");
    this._subcriptionF.unsubscribe();
    setTimeout(()=>{this.testT(id_tarea)},3000);
    
    console.log("testu")
  }
  

  getTareaXuser(id_user:number){
    console.log("paso1");
    let url=root_endpoint+"get_tareasXuser.php?id_user="+id_user;
    return this.http.get<any[]>(url)
  }

  subsTareaXuser(id_user:number){
    console.log("paso2");
    this._subscriptionTarea = this.getTareaXuser(id_user).subscribe(
      res=>{
        this.tareasUser = res;
        console.log(this.tareasUser);
      }
    )
  }

  getSubsTareaXuser(id_user:number){
    console.log("paso3");
    this._subscriptionTarea.unsubscribe();
    setTimeout(()=>{this.subsTareaXuser(id_user)},3000);
  }
  
  getTareasGantt(id_area:number,leg:number):Observable <ShowTareaGantt[]>
  {
    let url=root_endpoint+"get_tareas_gantt.php?id_area="+id_area+"&&legajo="+leg;
    return this.http.get<ShowTareaGantt[]>(url)
  }
  getSubTareasGantt(id_tarea:number):Observable <ShowTareaGantt[]>
  {
    let url=root_endpoint+"get_sub_tareas_gantt.php?id_tarea="+id_tarea;
    return this.http.get<ShowTareaGantt[]>(url)
  }
  getTareas(id_area:number,leg:number):Observable <ShowTarea[]>
  {
    let url=root_endpoint+"get_tareas.php?id_area="+id_area+"&&legajo="+leg;
    return this.http.get<ShowTarea[]>(url)
  }
  get1Tarea(id_tarea:number):Observable <ShowTarea[]>
  {
    let url=root_endpoint+"get_1tarea.php?id_tarea="+id_tarea;
    return this.http.get<ShowTarea[]>(url)
  }
  getEstadoTareas():Observable <EstadoTarea[]>
  {
    let url=root_endpoint+"get_estado_tareas.php";
    return this.http.get<EstadoTarea[]>(url)
  }
  setAreaYProy(leg:number,id_area:number) 
  {
    let save=new SaveLAData(leg,id_area)
    localStorage.setItem('LAdata', JSON.stringify({save}));
  }
  getAreaYProy():any
  {
    return JSON.parse(localStorage.getItem('LAdata'));
  }
  getAllPriorTareas(id_area,leg,id_tarea){
    let url=root_endpoint+"get_all_prior_tareas.php?id_area="+id_area+"&&legajo="+leg+"&&id_tarea="+id_tarea;
    return this.http.get<any[]>(url)
  }
  getDataProyXTareaId(id_tarea){
    
  }
  removeAreaYProy()
  {
    localStorage.removeItem('LAdata');
  }
  n_tarea(res:InputTarea,id_area:number,leg:number)
  {
   
    let tarea=new Tarea(null,null,res.titulo,id_area,res.id_responsable,null,res.estado,leg,res.tiempo_estimado,null,null,"T");
    let n_tarea=new ModTarea(tarea,this.reg.getUserLogged().usr.id_user);
    let url=root_endpoint+"nueva_tarea.php";
    console.log(JSON.stringify(n_tarea));
    let body=JSON.stringify(n_tarea);
    const req = this.http.post<any>(url,body,this.httpOptions).subscribe(
    res=>{console.log(res);});
  }
  m_tarea(res:InputTarea,id_area:number,leg:number,id_tarea:number)
  {
    console.log(JSON.stringify(res));
    console.log(JSON.stringify(res.prioridad));
    let tarea=new Tarea(id_tarea,null,res.titulo,id_area,res.id_responsable,null,res.estado,leg,res.tiempo_estimado,null,res.prioridad);
    let m_tarea=new ModTarea(tarea,this.reg.getUserLogged().usr.id_user);
    let url=root_endpoint+"mod_tarea.php";
    let body=JSON.stringify(m_tarea);//TODO conexion
    const req = this.http.post<any>(url,body,this.httpOptions).subscribe(
      res=>{console.log(res);});

  }
  eliminar_tarea(id_tarea:number)
  {
    var aux1 = "id_tarea";
    var aux2 = "id_user";
    var obj  = { [aux1]: id_tarea , [aux2]: this.reg.getUserLogged().usr.id_user };
    let url=root_endpoint+"baja_tarea.php";
    let body=JSON.stringify(obj);
    const req = this.http.post<any>(url,body,this.httpOptions).subscribe(
    res=>{console.log(res);});
  }

  n_sub_tarea(res:InputTarea,id_area:number,leg:number)
  {
   
    let tarea=new Tarea(null,res.subtarea_de_id,res.titulo,id_area,res.id_responsable,null,res.estado,leg,res.tiempo_estimado,null,null,"ST");
    let n_tarea=new ModTarea(tarea,this.reg.getUserLogged().usr.id_user);
    let url=root_endpoint+"nueva_tarea.php";
    let body=JSON.stringify(n_tarea);
    console.log(body);
    const req = this.http.post<any>(url,body,this.httpOptions).subscribe(
    res=>{console.log(res);});
  }
 
}
