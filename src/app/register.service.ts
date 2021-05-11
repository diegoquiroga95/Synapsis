import { Injectable } from '@angular/core';
import {UserLog, UserResponse,User} from './users';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';//para http request
import { map} from 'rxjs/operators';//para catch de los errores de http
import { Observable} from 'rxjs';
import { Empresa } from '../models/empresa';
import { TipoUser } from './pages/register/tipo_user';
import { root_endpoint } from "../app/enpoint";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }
  private registerUrl = root_endpoint+'login/register.php';
    private httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    
    
    
  registrarse(user:UserLog):Observable<UserResponse>
  {    
    let body= JSON.stringify(user);    
    return this.http.post<UserResponse>(this.registerUrl,body,this.httpOptions);
    }
  login(mail:string,passwd:string):Observable<UserResponse>
    {   
      //this.estaReg=0;   
      let url=root_endpoint+`login/logueo.php?mail=${mail}&pw=${passwd}`;
      return this.http.get(url)
    .pipe(map(response => <UserResponse> response))
    }
  setUserLogged(user:UserResponse)
  {
    localStorage.removeItem("currentUser");
    let usr=user.usr;
    console.log(usr);
    localStorage.setItem('currentUser', JSON.stringify({ usr }));    
  }
  getUserLogged():any
  {
    console.log("ejecuta register getuserl")
    return JSON.parse(localStorage.getItem('currentUser'));
  }
  getEmpresa():Observable <Empresa[]>
  {
    let url=root_endpoint+"get_empresas.php";
    return this.http.get<Empresa[]>(url)
    
  }
  getTipo():Observable <TipoUser[]>
  {
    let url=root_endpoint+"get_tipo_user.php";
    return this.http.get<TipoUser[]>(url)
  }
  }