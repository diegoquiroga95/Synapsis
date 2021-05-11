import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  ViewerOptions,
  ViewerInitializedEvent,
  DocumentChangedEvent,
  SelectionChangedEventArgs,
  Extension,
} from 'ng2-adsk-forge-viewer';

import { MyExtension } from "./my-extension";
import { ForgeviewerServiceService } from "./forgeviewer-service.service";
import { ActivatedRoute } from '@angular/router';
import { interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { map, mergeMap, startWith, switchMap } from 'rxjs/operators';
@Component({
  selector: 'ngx-viewer-archivos',
  templateUrl: './viewer-archivos.component.html',
  styleUrls: ['./viewer-archivos.component.scss']
})

export class ViewerArchivosComponent implements OnInit, OnDestroy {

  name = 'Angular Forge Viewer';
  public viewerOptions: ViewerOptions;
  public documentId: string;
  authToken: any;
  id_archivo: any
  urnToken: any;
  u: string;
  _subsTranslate: Subscription =Subscription.EMPTY;
  _subsUpload: Subscription =Subscription.EMPTY;
  loadingUpload:boolean = true;
  loadingTranslate:boolean;
  loadingViewer:boolean;
  statusText:string;
  constructor(public ForgeVwrSrv: ForgeviewerServiceService, private route: ActivatedRoute,) {
    this.id_archivo = +this.route.snapshot.paramMap.get('idarch');
    this.urnToken = this.ForgeVwrSrv.urnToken;
  }
  ngOnDestroy() {
    this._subsTranslate.unsubscribe();
    this._subsUpload.unsubscribe();
  }

  public ngOnInit() {


    this.ForgeVwrSrv.fileIsUpload(this.id_archivo).subscribe(
      res => {
        if (res.status === "404") {
          console.log("no esta 404");
          this.ForgeVwrSrv.uploadJob(this.id_archivo);
     
          this.statusText = "Preparando Archivo";
          this._subsUpload = this.checkStatusUpload(this.id_archivo);

        } else if (res.status === "exist") {
          console.log("exist")
          this.getStatusTranslate(this.id_archivo);
        } else {
          console.log("error");
        }
      }
    )



    //  this.ForgeVwrSrv.getStatusUrn(this.id_archivo).subscribe(
    //    res=>{
    //     console.log("translate");
    //     console.log(res.status);
    //      if (res.status ==="404") {
    //        console.log("404");
    //        this.ForgeVwrSrv.translateUrn(this.id_archivo);
    //        this._subsTranslate= this.checkStatusUrnSub(this.id_archivo);
    //      } else if (res.status ==="complete"){
    //       this.loadViewer();
    //      }
    //    }
    //  )







  }


  ////////////////////////////////
  public selectionChanged(event: SelectionChangedEventArgs) {
    console.log(event.dbIdArray);
  }

  getUrn(urn) {
    console.log(JSON.stringify(urn));
    this.urnToken = JSON.stringify(urn);
  }


  getStatusTranslate(id_archivo) {
    this.ForgeVwrSrv.getStatusUrn(id_archivo).subscribe(
      res => {
        this.statusText = "Procesando Archivo";
        console.log("translate");
        console.log(res.status);

        if (res.status === "404") {
          console.log("404");
          //traduciendo
        
          this.ForgeVwrSrv.translateUrn(id_archivo);
          this._subsTranslate = this.checkStatusUrnSub(id_archivo);
        } else if (res.status === "complete") {
          //cargar componente , ocultar spiners 
        this.loadingUpload = false;
          this.loadViewer();
        }
      }
    )
  }



  checkStatusUrnSub(id_archivo) {
    return timer(0, 3000).pipe(
      mergeMap(_ => this.ForgeVwrSrv.getStatusUrn(id_archivo))
    ).subscribe(res => {
      if (res.status === "complete") {
        this._subsTranslate.unsubscribe();

        this.loadingUpload = false;
        this.loadViewer();
      } else {
        //traduciendo
        //poner porcentaje de conplecion
        if(res.status === "404"){
          this.statusText ="Procesando Archivo: 0%";
        }
        this.statusText ="Procesando Archivo: "+ res.status;
        console.log("2");
      }
    });
  }

  checkStatusUpload(id_archivo) {
    return timer(0, 4000).pipe(
      mergeMap(_ => this.ForgeVwrSrv.fileIsUpload(id_archivo))
    ).subscribe(
      res => {
        if (res.status === "exist") {
          this._subsUpload.unsubscribe();
         
          //// ----- /////
        
          this.getStatusTranslate(id_archivo);
          
        } else {
          //subiendo 
     
          console.log(res.status);
          console.log("2sadad")
        }
      }
    )
  }

  loadViewer() {

    this.ForgeVwrSrv.getForgeToken().subscribe(
      res => {
        this.authToken = res;



        this.viewerOptions = {
          initializerOptions: {
            env: 'AutodeskProduction',
            getAccessToken: (onGetAccessToken: (token: string, expire: number) => void) => {

              const expireTimeSeconds = 60 * 30;

              onGetAccessToken(this.authToken.applicationToken, expireTimeSeconds);
            },
            api: 'derivativeV2',
            enableMemoryManagement: true,
          },
          viewerConfig: {
            extensions: [
              'Autodesk.DocumentBrowser',
              MyExtension.extensionName,
            ],
            theme: 'bim-theme',
          },
          onViewerScriptsLoaded: () => {
            // Registrar una extension Custom
            Extension.registerExtension(MyExtension.extensionName, MyExtension);
          },
          onViewerInitialized: (args: ViewerInitializedEvent) => {


            const t = new Subject<any>();
            this.ForgeVwrSrv.getUrnFile(this.id_archivo).subscribe(
              res => {
                args.viewerComponent.DocumentId = res.token
              }

            )

          },
          // showFirstViewable: false,
          // headlessViewer: true,
        };

      }
    );
  }


}
