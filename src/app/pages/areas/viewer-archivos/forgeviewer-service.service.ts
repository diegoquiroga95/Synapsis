import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { root_endpoint } from "../../../enpoint";
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ForgeviewerServiceService {
  _SubscriptionToken: Subscription;
  authTokenForgeViewer: any;
  _SubscriptionUrn: Subscription;
  urnToken: any;
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {


  }
  getForgeToken(): Observable<string> {
    let url = root_endpoint + "forge_authO.php";
    return this.http.get<string>(url);
  }

  subscribeForgeToken() {
    this._SubscriptionToken = this.getForgeToken().subscribe(
      res => {
        this.authTokenForgeViewer = res;
      }
    )
  }

  unsubscribeForgeToken() {
    this._SubscriptionToken.unsubscribe();
    this.authTokenForgeViewer = null;
  }


  getUrnFile(idArchivo: any): Observable<any> {
    let url = root_endpoint + "forge_get_urn.php?idArchivo=" + idArchivo;
    return this.http.get<any>(url);
  }

  getStatusUrn(idArchivo: any): Observable<any> {
    let url = root_endpoint + "forge_translate_status.php?idArchivo=" + idArchivo;

    return this.http.get<any>(url);
  }

  translateUrn(idArchivo: any) {
    let url = root_endpoint + "forge_translate_job.php";
    let body = {
      id_arch: idArchivo
    }

    console.log(body)
    return this.http.post<any>(url, JSON.stringify(body), this.httpOptions).subscribe(
      res => console.log(res)
    )
  }

  uploadJob(idArchivo: any) {
    let url = root_endpoint + "forge_create_bucket.php";
    let body = {
      id_arch: idArchivo
    }
    console.log("SUBIENDO");
    console.log(body)
    return this.http.post<any>(url, JSON.stringify(body), this.httpOptions).subscribe(
      res => console.log(res)
    )
  }

  fileIsUpload(idArchivo: any){
    let url = root_endpoint + "forge_file_is_there.php?idArchivo=" + idArchivo;
    return this.http.get<any>(url);
  }
}
