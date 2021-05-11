import { Component, OnInit } from '@angular/core';
import {Proyecto} from '../proyectos/proyecto';
import {RegisterService} from '../../register.service';
import {ProyectoService} from "../../proyecto.service";
import {Router, ActivatedRoute} from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-proyectos-d',
  templateUrl: './proyectos-d.component.html',
  styleUrls: ['./proyectos-d.component.scss']
})
export class ProyectosDComponent implements OnInit {
  proy:Proyecto[]; 
  dialogOpened=false;
  leg:number;
  data:any;
  noHay:boolean;
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
          title: ' <button mat-button class="btn btn-primary" routerLink="/pages/detalle-proyecto/{{ proyecto.legajo }}"><i class="nb-edit"></i></button>'
        },
        {
          name: 'delete',
          title: '<button mat-icon-button (click)="eliminar(proyecto.legajo)"><i class="nb-trash"></i></button> </td>'
        },
      ],
      add: false,
      edit: false,
      delete:false,
    },
  };
  constructor(    
    private proy_serv:ProyectoService,
    private register:RegisterService,
    private sidebarService:NbSidebarService,
    private route:ActivatedRoute,
  private router:Router){}
  ngOnInit()
  {
     if(this.register.getUserLogged().usr.id_tipo_usuario==0)
    {
     this.proy_serv.getProy_E().subscribe(
      proy=>
      {this.proy=proy}
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
      this.router.navigate(['pages/detalle-proyecto/'+event.data.legajo]);
      break;
      case'delete':
      this.eliminar(event.data.legajo);
      break;
    }
  }
  eliminar(leg:number)
  {
    this.leg=leg;
    this.open();
  }
  action(status) {
    if(status==='si')
    {
      this.proy_serv.eliminar_proy(this.register.getUserLogged().usr.id_user,this.leg);
      this.router.navigate(['/dashboard']);
    }
    this.dialogOpened = false;
  }
  close() {
    this.dialogOpened = false;
  }

  open() {
    this.dialogOpened = true;
  }
}
