import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { root_endpoint } from "../../enpoint";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MailSenderService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http:HttpClient) { }

  sendMailData(data:any){
    let url=root_endpoint+"mail_Sender.php";
    let body= JSON.stringify(data);    
    return this.http.post(url,body,this.httpOptions).subscribe(
      res=>{console.log(res)});      
  }
}
 