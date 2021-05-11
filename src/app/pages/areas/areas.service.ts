import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { Area, ModArea, ShowArea } from './area';
import { RegisterService } from '../../register.service';

import { root_endpoint } from "../../enpoint";
@Injectable({
  providedIn: 'root'
})
export class AreasService {

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient,
  private reg:RegisterService) { }
  getArea():Observable <Area[]>
  {
    let url=root_endpoint+"get_areas.php";
    return this.http.get<Area[]>(url)
  }

  setProyectoAsignado(leg:number)
  {
    localStorage.setItem('proyAsig', JSON.stringify( leg ));
  }
  getProyectoAsignado()
  {
    return JSON.parse(localStorage.getItem('proyAsig'));
  }
  setAsigArea(areas:Array<any>)//Observable<any>
  {
    areas.push(+this.getProyectoAsignado());
    localStorage.removeItem('proyAsig');
    let body= JSON.stringify(areas);    
    console.log(body);
    let url=root_endpoint+"asig_areas.php";
    return this.http.post<any>(url,body,this.httpOptions);
  }
  get_areaXproy(leg:Number):Observable <Area[]>
  {
    let url=root_endpoint+"areaXproy.php?legajo="+leg;
    return this.http.get<Area[]>(url);
  }
  get_1area(id_area:number,leg:Number):Observable <ShowArea>
  {
    let url=root_endpoint+"get_1area.php?id_area="+id_area+"&&legajo="+leg;
    return this.http.get<ShowArea>(url);
  }
  n_area(area:Area)
  {
    
    let leg=this.getProyectoAsignado();
    let m_area=new ModArea(area,this.reg.getUserLogged().usr.id_tipo_usuario,leg)
    let body= JSON.stringify(m_area);
    let url=root_endpoint+"nueva_area.php";
    const req = this.http.post<any>(url,body,this.httpOptions).subscribe(
      res=>{console.log(res);}); 
      
  }
  m_area(area:Area,id_area:number)
  {
    
    let leg=this.getProyectoAsignado();
    let m_area=new ModArea(area,this.reg.getUserLogged().usr.id_tipo_usuario,leg,id_area)
    let body= JSON.stringify(m_area);
    console.log(body)
    let url=root_endpoint+"mod_area.php";
    const req = this.http.post<any>(url,body,this.httpOptions).subscribe(
    res=>{console.log(res);});
    
  }
  b_area(id_area:number,leg:number)
  {
    
    let m_area=new ModArea(null,this.reg.getUserLogged().usr.id_tipo_usuario,leg,id_area);
    let body= JSON.stringify(m_area);
    let url=root_endpoint+"baja_area.php";
    const req = this.http.post<any>(url,body,this.httpOptions).subscribe(
    res=>{console.log(res);});
    
  }

  checkForNameTarea(nombre:string):Observable<any>{
    let url=root_endpoint+"check_area_nombre_repetido.php?nombre="+nombre;
    return this.http.get<any>(url);
  }
}
