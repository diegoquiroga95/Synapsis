import { Component, OnInit } from '@angular/core';
import { UserService } from '../../usr-mgmt/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'ngx-directorio-proyecto',
  templateUrl: './directorio-proyecto.component.html',
  styleUrls: ['./directorio-proyecto.component.scss']
})
export class DirectorioProyectoComponent implements OnInit {

  directorioData:any;
  leg: number;
  dialogOpened:boolean = false;
  persona:boolean;
  constructor(
  
    public UsrSrv:UserService,
    private route:ActivatedRoute,
    ) { 
      this.directorioData = this.UsrSrv.dataDirectorio;
      console.log(this.directorioData);
    }

 

     
  settings = {
    
    columns: {
      nombre: {
        title: 'Responsable Nombre',
      },
      apellido: {
        title: 'Responsable Apellido',
      },
      mail: {
        title: 'mail',
      },
      telefono: {
        title: 'telefono',
      }
     
    },pager : {
      perPage :5
},
    actions: {
      columnTitle:"Acciones",
      position:"right",
      class:"action-column",
      

      add: false,
      edit: false,
      delete:false,
    },
  };

  ngOnInit(){
    //sacar id user de local storage despues
    this.leg = +this.route.snapshot.paramMap.get('leg');
    this.UsrSrv.DirectorioDataSubscrition(this.leg);

 
  }

  close() {
    this.dialogOpened = false;
    console.log(this.dialogOpened);
  }

  openModalPersona() {
    this.persona = true;
    this.dialogOpened = true;
  }

  openModalCompania() {
    this.persona= false;
    this.dialogOpened = true;
  }
ngOnDestroy() {
  this.UsrSrv.DirectorioDataUnsubscribe();
  
}

}
