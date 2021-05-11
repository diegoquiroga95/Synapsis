import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser'; 
import { FileService } from "../archivos/file.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'ngx-viewer-archivos-docs',
  templateUrl: './viewer-archivos-docs.component.html',
  styleUrls: ['./viewer-archivos-docs.component.scss']
})
export class ViewerArchivosDocsComponent implements OnInit {
  URL:any;
  viewerUrl:any;
  url2:string;
  id_archivo:number;
  constructor(
    public DomSanit:DomSanitizer, 
    private FileSrv:FileService,
    private Route:ActivatedRoute) {
      this.id_archivo = +this.Route.snapshot.paramMap.get('idarch');
     }

  ngOnInit(){

    this.FileSrv.getInfoArchivo(this.id_archivo).subscribe(
      res=>{
        console.log(res);
        this.URL = this.DomSanit.bypassSecurityTrustResourceUrl("http://localhost/Sinapsis/SinapsisApi/"+ res.path);
      }
    );

  
  }

  


}
