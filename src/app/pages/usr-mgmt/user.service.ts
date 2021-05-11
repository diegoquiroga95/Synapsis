import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User, ModUser } from '../../users';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { root_endpoint } from "../../enpoint";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  _SubscriptionDirectorio:Subscription;
  dataDirectorio:any;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  get_1User(id_user:number):Observable<User>
  {
    let url=root_endpoint+"get_1user.php?id_user="+id_user;
    return this.http.get<User>(url);
  }
  getUsers():Observable<User[]>
  {
    let url=root_endpoint+"get_users.php";
    return this.http.get<User[]>(url);
  }
  eliminar_user(id_admin:number,id_user:number)
  {
    let url=root_endpoint+"baja_user.php?id_user="+id_user+"&&id_admin="+id_admin;
    const req = this.http.get(url).subscribe(
      res=>{console.log("ok");});  
  }
  n_user(user:User)
  {
    let url=root_endpoint+"login/register.php";
    let body= JSON.stringify(user);    
    return this.http.post(url,body,this.httpOptions).subscribe(
      res=>{console.log("ok");});      
  }
  m_user(user:User,id_user:number)
  {
    const m_user=new ModUser(user,id_user)
    let url=root_endpoint+"mod_user.php";
    let body= JSON.stringify(m_user);
    return this.http.post(url,body,this.httpOptions).subscribe(
    res=>{console.log("ok");}); 
  }
  get_userXarea(id_area:number,leg:number):Observable<User[]>
  {
    let url=root_endpoint+"userXarea.php?id_area="+id_area+"&&legajo="+leg;
    return this.http.get<User[]>(url);
  }

  getUsersXDirectorioXproyecto(id_user:number):Observable<any>
  {
    //paso 1
    console.log("paso1");
    let url=root_endpoint+"get_directorioxusers.php?id_proyecto="+id_user;
    return this.http.get<any>(url);
  }

  DirectorioDataSubscrition(id_user:number){
    //paso 2
    this._SubscriptionDirectorio = this.getUsersXDirectorioXproyecto(id_user).subscribe(
      res=>{
        this.dataDirectorio = res;
        console.log(res);
      }
    )
  }

  DirectorioDataRefresh(id_user:number){
    //paso 3
    this._SubscriptionDirectorio.unsubscribe();
    setTimeout(() => {
      this.DirectorioDataSubscrition(id_user)}, 3000);
  }
  DirectorioDataUnsubscribe(){
    this.dataDirectorio="";
    this._SubscriptionDirectorio.unsubscribe();
  }
}
