import { Component, OnInit } from '@angular/core';
import { ProyectoService } from "../../proyecto.service";
import { RegisterService } from '../../register.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CertificadoService } from "../obra-cert/certificado.service";

@Component({
  selector: 'ngx-generacion-documentos',
  templateUrl: './generacion-documentos.component.html',
  styleUrls: ['./generacion-documentos.component.scss']
})
export class GeneracionDocumentosComponent implements OnInit {

  proy: any;
  noHay: boolean;
  showTable: boolean = false;
  fileWindowOpened: boolean = false;
  legajo: any;
  settings = {

    columns: {
      legajo: {
        title: 'Legajo',
        sortDirection: 'asc',
        compareFunction: (dir, a, b) => parseInt(a) >= parseInt(b) ? dir * 1 : dir * -1,
      },
      cliente: {
        title: 'Cliente',
      },
      nombre: {
        title: 'Nombre del Proyecto',
      }

    }, pager: {
      perPage: 5
    },
    actions: {
      columnTitle: "Acciones",
      position: "right",
      class: "action-column",
      custom: [
        {
          name: 'edit',
          title: ' <button mat-button class="btn btn-primary" ><i class="nb-edit"></i></button>'
        },
        {
          name: 'archivos',
          title: ' <button mat-button class="btn btn-primary" ><i class="nb-edit"></i></button>'
        },

      ],
      add: false,
      edit: false,
      delete: false,
    },
  };


  constructor(
    private proySrv: ProyectoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private register: RegisterService,
    private certSrv: CertificadoService

  ) { }

  ngOnInit() {

    if (this.register.getUserLogged().usr.id_tipo_usuario == 0) {
      this.proySrv.getProy().subscribe(
        proy => { this.proy = proy }
        ,
        err => { console.log("error de servidor") }
      );
    } else if (this.register.getUserLogged().usr.id_tipo_usuario === 1) {
      this.proySrv.getMisProy(this.register.getUserLogged().usr.id_user).subscribe(
        proy => {
          this.proy = proy;
          if (this.proy == null) { this.noHay = true }
        }
        ,
        err => { console.log("error de servidor") }
      );
      console.log("solo los mios");
    }
    else {
      this.router.navigate(['/pages/accesodenegado']);
    }
  }

  archivosWindowClose() {

    this.fileWindowOpened = false;
  }
  openFileModal() {
    this.fileWindowOpened = true;
  }


  onCustomAction(event) {
    switch (event.action) {
      case 'edit':
        this.certSrv.checkForCerts(event.data.legajo).subscribe(
          certData => {
            console.log(JSON.stringify(certData))
            if (certData === 0) {
              this.router.navigate(['pages/obracert/' + event.data.legajo + '/1']);
            } else {
              console.log("tiene --" + certData);
              this.router.navigate(['pages/obracert/' + event.data.legajo + '/' + (certData.numero_certificado + 1)]);
            }
          })
        break;
      case 'archivos':
        this.legajo= event.data.legajo;
        console.log(this.legajo);
        this.openFileModal()
        break;
    }
  }

  showCertObraTable() {

    if (this.showTable) {
      this.showTable = false;
    } else {
      this.showTable = true;
    }
    console.log(this.showTable);
  }

}



