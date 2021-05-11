import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TareasService } from "../../tareas/tareas.service";

import { Validators, FormGroup, FormControl } from '@angular/forms';
import { FileService } from "./file.service";
import { DatePipe } from '@angular/common';
// import { Subscription, Observable, Subject ,of as observableOf ,merge } from 'rxjs';
// import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
// import { map, catchError } from "rxjs/operators";
// import { Archivos ,Files } from './archivos';
// import { tap, debounceTime, distinctUntilChanged, switchMap, startWith } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';





@Component({
  selector: 'ngx-archivos',
  templateUrl: './archivos.component.html',
  styleUrls: ['./archivos.component.scss']
})
export class ArchivosComponent implements OnInit {
  @Input() idTarea: any;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatSort) sort:MatSort;
 
//file Upload form
  myDate;
  filesToUpload: File[];
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
 //table 

 displayedColumns: string[] = ['id_arch', 'nombre', 'path', 'subido'];
  //listaArchivos : Archivos[] =[];
  listaArchivos:any;
  resultsLength = 0;
  isLoadingResults = true;


  //test
  funciones = [{
    name: 'notas',
    title: '<button mat-icon-button><i class="nb-compose"></i></button> </td>'
  },
  {
    name: 'descargar',
    title: '<button mat-icon-button><i class="nb-arrow-thin-down"></i></button> </td>'
  },
  {
    name: 'view',
    title: '<button mat-icon-button><i class="nb-search"></i></button> </td>'
  },]
  settings = {

    columns: {
      version: {
        title: 'Version',
        sortDirection: 'asc',
        width: "50px",
        compareFunction: (dir, a, b) => parseInt(a) >= parseInt(b) ? dir * 1 : dir * -1,
      },
      nombre: {
        title: 'Nombre',

      },
      subido: {
        title: 'Fecha',
      },
      estado: {
        title: 'Estado',
      }

    }, pager: {
      perPage: 5
    },
    actions: {
      columnTitle: "Acciones",
      position: "right",
      class: "action-column",

      custom:this.funciones
      ,
      add: false,
      edit: false,
      delete: false,
    },
  };

  constructor(
    public tareaSrv: TareasService,
    public fileSrv:FileService,
    private datePipe:DatePipe,
    private router:Router) {
    this.listaArchivos = this.tareaSrv.t;

     }

  ngOnInit() {
    console.log(this.idTarea);
    this.tareaSrv.testT(this.idTarea);
    // this.tareaSrv.getFilesFromTask(this.idTarea).subscribe(
    //   res=>{
    //     this.listaArchivos =res;
    //   }
    // );

    

    

  }
  ngAfterViewInit(){
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // merge(this.sort.sortChange ,this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //   switchMap(()=>{
    //     this.isLoadingResults =true;
    //     return this.tareaSrv.getFilesFromTask(this.idTarea)
    //   }),
    //   map(listaArchivos =>{
    //     this.isLoadingResults =false;
    //     return listaArchivos;
    //   }),catchError(()=>{
    //     this.isLoadingResults =false;
    //     return observableOf([]);
    //   })
    //   ).subscribe(listaArchivos=> this.listaArchivos =listaArchivos)
  }












  ///////////////////

  get f() {
    return this.myForm.controls;
  }

  onFileChange(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    
   
  }


  upload(){
    this.fileSrv.progress =0;
    let formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    let name;
    this.myDate = new Date();
    this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');




    for (let i = 0; i < files.length; i++) {
      console.log("//////////////");
      console.log(getFileExtension(files[0].name));
      console.log("//////////////");
      let regex = new RegExp(("."+getFileExtension(files[0].name)));

      console.log(regex);
      name = files[0].name.replace(regex,"") + '_' + this.idTarea+ '_' + this.myDate +"."+getFileExtension(files[0].name); 
      console.log(name);
    
      
      formData.append("file[]", files[i],name);

    
 
      
    }
    console.log(this.myForm.value);
    this.fileSrv.onUpload(formData);
    this.tareaSrv.testTu(this.idTarea);
    // this.source.refresh();

      
  }

  onCustomAction(event) {
    switch(event.action){
      case'notas':
     console.log("notas");
      break;
      case'descargar':
      console.log("descargar");
      break;
      case'delete':
      console.log("delete");
      // this.id_tarea = event.data.id_tarea;
      // this.openModal();
      break;
      case'view':

      this.checkFileExt(event.data.id_arch);
     
      break;
    }
  }

  checkFileExt(idArch){
    //console.log(idArch);
    this.fileSrv.checkForForFileType(idArch).subscribe(
      res=>{
        if (res === 1) {
           let ruta='pages/viewer-archivos/'+idArch;
     
          this.router.navigate([ruta]);
        } else {
          let ruta='pages/viewer-documentos/'+idArch;
          this.router.navigate([ruta]);
        }
      }
    )
   }
 


  //

}
function getFileExtension(filename) {
  return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

