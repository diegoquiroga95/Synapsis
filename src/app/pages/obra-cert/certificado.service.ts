import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { root_endpoint } from '../../enpoint';
import { Medidas } from "../../../models/medidas";
import { certificadoObra } from "../../../models/certificadoObra";
import { root } from 'rxjs/internal/util/root';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';


@Injectable({
  providedIn: 'root'
})
export class CertificadoService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }


  getMedidas() {
    let url = root_endpoint + "get_all_unidades_medidas.php";
    return this.http.get<Medidas[]>(url);
  }

  getAllcertByProy(legajo: number) {
    let url = root_endpoint + "get_all_cert_obraXproy.php?legajo=" + legajo;
    return this.http.get<certificadoObra[]>(url);
  }

  checkForCerts(legajoProy: any) {
    let url = root_endpoint + "get_check_certobra.php?legajo=" + legajoProy;
    return this.http.get<any>(url);
  }

  nuevo_cert(items: any, legajo: number, nCert: number, iva: number, anticipo: number) {
    let url = root_endpoint + "nuevo_cert_obra.php";
    const data = [...items, legajo, nCert, iva, anticipo];
    let body = JSON.stringify(data);
    console.log(data);
    const req = this.http.post(url, body, this.httpOptions).subscribe(
      res => { console.log(res); });
  }

  uploadCert(uploadData: FormGroup) {
    let url = root_endpoint + "nuevo_cert_obra_upload.php";
    console.log(uploadData);
    this.http.post(url, uploadData).subscribe(
      res => { console.log(res); });;

  }

  getAnteriorCert(legajo: number, nCert: number) {
    let url = root_endpoint + "get_certObj.php?legajo=" + legajo + "&&ncert=" + nCert;
    return this.http.get<any[]>(url);
  }

}
