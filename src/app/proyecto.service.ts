import { Injectable } from '@angular/core';
import { Proyecto, NewProyecto, ModProyecto } from './pages/proyectos/proyecto';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';//para http request
import { map } from 'rxjs/operators';
//import { Arch} from './arch/arch';
import { RegisterService } from './register.service';
import { User } from './users';
import { root_endpoint } from "../app/enpoint";

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {
  private new_proy_Url = root_endpoint + '/nuevo_proyecto.php';
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient, private reg: RegisterService) { }

  getMineProy(): Observable<Proyecto[]> {
    let url = root_endpoint + "get_proy.php?id_user=" + this.reg.getUserLogged().usr.id_user;
    return this.http.get<Proyecto[]>(url)
      .pipe(map(response => <Proyecto[]>response));
  }
  getProy(): Observable<Proyecto[]> {
    let url = root_endpoint + "get_all_proy.php";
    return this.http.get<Proyecto[]>(url)
      .pipe(map(response => <Proyecto[]>response));
  }
  get1Proy(legajo: number): Observable<Proyecto> {
    let url = root_endpoint + "get_1proy.php?legajo=" + legajo;
    return this.http.get<Proyecto>(url)
      .pipe(map(response => <Proyecto>response));
  }

  getUltProy(id_user: number): Observable<Proyecto[]> {
    let url = root_endpoint + "l_proy.php?id_user=" + id_user;
    return this.http.get<Proyecto[]>(url)
      .pipe(map(response => <Proyecto[]>response));
  }
  /*
  getUltArch(id_user:number):Observable <Arch[]>
  {
    let url=root_endpoint+"l_archivos.php?id_user="+id_user;
    return this.http.get<Arch[]>(url)
    .pipe(map(response => <Arch[]> response));
  }
  */
  n_proy(proy: Proyecto) {
    const n_proy = new NewProyecto(proy, this.reg.getUserLogged().usr.id_user);
    let body = JSON.stringify(n_proy);
    console.log(body);
    const req = this.http.post(this.new_proy_Url, body, this.httpOptions).subscribe(
      res => { console.log(res); });
  }
  m_proy(proy: Proyecto, leg: number) {
    let url = root_endpoint + "mod_proyecto.php";
    const n_proy = new ModProyecto(proy, this.reg.getUserLogged().usr.id_user, leg);
    let body = JSON.stringify(n_proy);
    const req = this.http.post(url, body, this.httpOptions).subscribe(
      res => { console.log(res); });
  }
  descartar_proy(id_user: number, leg: number) {
    let url = root_endpoint + "to_trash.php?legajo=" + leg + "&id_user=" + id_user;
    const req = this.http.get(url).subscribe(
      res => { console.log(res); },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log("Client Side err");
        }
        else {
          console.log(err);
          console.log("Server side err");
        }
      });
  }
  eliminar_proy(id_user: number, leg: number) {
    let url = root_endpoint + "trash.php?legajo=" + leg + "&id_user=" + id_user;
    const req = this.http.get(url).subscribe(
      res => { console.log("ok"); });
  }
  getCli(): Observable<User[]> {
    let url = root_endpoint + "get_clientes.php";
    return this.http.get<User[]>(url)
  }
  getMem(): Observable<User[]> {
    let url = root_endpoint + "get_workers.php";
    return this.http.get<User[]>(url)
  }
  getMemXProy(leg): Observable<User[]> {
    let url = root_endpoint + "get_workersXproy.php?legajo=" + leg;
    return this.http.get<User[]>(url)
  }
  getProy_E(): Observable<Proyecto[]> {
    let url = root_endpoint + "get_proy_desc.php";
    return this.http.get<Proyecto[]>(url)
      .pipe(map(response => <Proyecto[]>response));
  }
  getProy_I(): Observable<Proyecto[]> {
    let url = root_endpoint + "get_proy_inac.php";
    return this.http.get<Proyecto[]>(url)
      .pipe(map(response => <Proyecto[]>response));
  }
  getMisProy(id: number): Observable<Proyecto[]> {
    let url = root_endpoint + "get_mis_proy.php?id_user=" + id;
    return this.http.get<Proyecto[]>(url)
  }
  getMemXArea(legajo: number, area: number) {
    let url = root_endpoint + "get_workersXproyXarea.php?legajo=" + legajo + "&area=" + area;
    return this.http.get<User[]>(url)
  }

  buscarLegajoRepetido(legajo:number){
    let url = root_endpoint + "check_proyecto_legajo_repetido.php?legajo=" + legajo;
    return this.http.get<any>(url)
  }
  buscarNombreRepetido(nombre:string){
    let url = root_endpoint + "check_proyecto_nombre_repetido.php?nombre=" + nombre;
    return this.http.get<any>(url)
  }
}
