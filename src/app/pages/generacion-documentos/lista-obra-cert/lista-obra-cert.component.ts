import { Component, OnInit ,Input } from '@angular/core';
import * as FileSaver from 'file-saver';
import { CertificadoService } from "../../obra-cert/certificado.service";
import { root_endpoint } from '../../../enpoint';
@Component({
  selector: 'ngx-lista-obra-cert',
  templateUrl: './lista-obra-cert.component.html',
  styleUrls: ['./lista-obra-cert.component.scss']
})
export class ListaObraCertComponent implements OnInit {
  @Input() legajo: any;
  certs:any;
  settings = {

    columns: {
      legajo_proy: {
        title: 'Legajo',
        sortDirection: 'asc',
        compareFunction: (dir, a, b) => parseInt(a) >= parseInt(b) ? dir * 1 : dir * -1,
      },

      numero_certificado: {
        title: 'Certificado N°',
      },

      ruta_archivo: {
        title: 'Ruta',
      }

    }, pager: {
      perPage: 3
    },
    actions: {
      columnTitle: "Acciones",
      position: "right",
      class: "action-column",
      custom: [
        {
          name: 'bajar',
          title: ' <button mat-button class="btn btn-primary" ><i class="nb-edit"></i></button>'
        },

      ],
      add: false,
      edit: false,
      delete: false,
    },
  };
  blob: Blob;
  constructor(
    private certSrv:CertificadoService,
  ) {



   }

  ngOnInit() {
    this.certSrv.getAllcertByProy(this.legajo).subscribe(certs=>{
      console.log(certs);
      this.certs = certs;
    })
    console.log(this.legajo);
  }

  onCustomAction(event) {
    switch (event.action) {
      case 'bajar':
        console.log(event.data.ruta_archivo);
        console.log("bajando");
        root_endpoint
        this.download(event.data.ruta_archivo);
        break;
    }
  }

  download(url:string) {
   // this.certSrv.downloadFile();
   window.open(root_endpoint+url, "_blank");
  }
}
