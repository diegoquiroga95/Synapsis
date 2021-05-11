import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegisterService } from '../../register.service';
import { ProyectoService } from '../../proyecto.service';
import { Proyecto } from "../proyectos/proyecto";

@Component({
  selector: 'ngx-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.scss']
})
export class DirectorioComponent implements OnInit {
  proy: Proyecto[];
  noHay: boolean;

  constructor(
    private router:Router,
    private register:RegisterService,
    private proy_serv:ProyectoService,
    ) { }


  settings = {

    columns: {
      legajo: {
        title: 'Legajo',
        sortDirection:'asc',
        compareFunction: (dir, a, b) => parseInt(a) >= parseInt(b) ? dir*1 : dir*-1,
      },
      cliente: {
        title: 'Cliente',
      },
      nombre: {
        title: 'Nombre del Proyecto',
      }

    },pager : {
      perPage :5
},
    actions: {
      columnTitle:"Acciones",
      position:"right",
      class:"action-column",
      custom: [
        {
          name: 'directorio',
          title: ' <button mat-button class="btn btn-primary" routerLink="/pages/detalle-proyecto/{{ proyecto.legajo }}"><i class="nb-edit"></i></button>'
        },
      ],
      add: false,
      edit: false,
      delete:false,
    },
  };
  ngOnInit(){
    if(this.register.getUserLogged().usr.id_tipo_usuario==0)
    {
     this.proy_serv.getProy().subscribe(
      proy=>
      {this.proy=proy}
      ,
      err=>{console.log("error de servidor")}
     ) ;
    }else if (this.register.getUserLogged().usr.id_tipo_usuario===1){
      this.proy_serv.getMisProy(this.register.getUserLogged().usr.id_user).subscribe(
        proy=>
        {
          this.proy=proy;
          if(this.proy==null){this.noHay=true}
        }
        ,
        err=>{console.log("error de servidor")}
       ) ;
       console.log("solo los mios");
    }
    else
    {
      this.router.navigate(['/pages/accesodenegado']);
    }


  }


  onCustomAction(event) {
    switch(event.action){
      case'directorio':
      let ruta='pages/directorio-proyecto/'+event.data.legajo;
      this.router.navigate([ruta]);
      break;
    }
  }


}
