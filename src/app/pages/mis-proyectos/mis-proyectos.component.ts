import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../proyectos/proyecto';
import { ProyectoService } from '../../proyecto.service';
import { RegisterService } from '../../register.service';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'ngx-mis-proyectos',
  templateUrl: './mis-proyectos.component.html',
  styleUrls: ['./mis-proyectos.component.scss']
})
export class MisProyectosComponent implements OnInit {
  proy:Proyecto[];
  noHay:boolean=false;
  data:any;
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
          name: 'edit',
          title: ' <button mat-button class="btn btn-primary" ><i class="nb-edit"></i></button>'
        },
      ],
      add: false,
      edit: false,
      delete:false,
    },
  };

  constructor(private proy_serv:ProyectoService,private register:RegisterService,private router:Router) 
  {}

  ngOnInit() {
    if(this.register.getUserLogged().usr.id_tipo_usuario==0)
    {
    this.proy_serv.getProy().subscribe(
      proy=>
      {
        this.proy=proy
      }
      ,
      err=>{console.log("error de servidor")}
     ) ;   
    }
    else
    {
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
    
  }
  onCustomAction(event) {
    switch(event.action){
      case'edit':
      this.router.navigate(['pages/nav-proyecto/'+event.data.legajo]);
      break;
     
    }
  }

}
