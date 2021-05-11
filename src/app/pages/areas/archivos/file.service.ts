import { Injectable } from '@angular/core';
import { root_endpoint } from "../../../enpoint";
import { HttpClient, HttpHeaders, HttpEventType, HttpResponse } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  progress: number;
  

  constructor(private http:HttpClient) { }
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  onUpload(uploadData:FormGroup){
    let url=root_endpoint + "nuevo_arch.php";
    this.http.post(url, uploadData, {
      reportProgress: true,
      observe: "events",
      responseType: 'blob'
    })
    .pipe(
      map((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.progress = Math.round((100 / event.total) * event.loaded);
          console.log(event.type);
        } else if (event.type == HttpEventType.Response) {
          console.log(event.type);
          //this.progress = null;
        } else if (event.type == HttpEventType.Sent) {
          console.log(event.type);
          //this.progress = null;
        }
      }),
      catchError((err: any) => {
        //this.progress = null;
        alert(err.message);
        return throwError(err.message);
      })
    )
    .toPromise();
}

checkForForFileType(id_archivo:string):Observable<any>{
  let url=root_endpoint+"check_filetype_viewer.php?id_arch="+id_archivo;
  return this.http.get<any>(url);
}

getInfoArchivo(id_archivo:number):Observable<any>{
  let url=root_endpoint+"get_archivo_infos.php?idArchivo="+id_archivo;
  return this.http.get<any>(url);
}
}



  


