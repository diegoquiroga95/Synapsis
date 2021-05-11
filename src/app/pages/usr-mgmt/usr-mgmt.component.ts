import { Component, OnInit } from '@angular/core';
import { User } from '../../users';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { RegisterService } from '../../register.service';

@Component({
  selector: 'ngx-usr-mgmt',
  templateUrl: './usr-mgmt.component.html',
  styleUrls: ['./usr-mgmt.component.scss']
})
export class UsrMgmtComponent implements OnInit {
  usrs:User[];
  user_a_elim:number;
  dialogOpened=false;
  settings = {
    
    columns: {
      id_user: {
        title: 'Id Usuario',
        sortDirection:'asc',
        compareFunction: (dir, a, b) => parseInt(a) >= parseInt(b) ? dir*1 : dir*-1,
      },
      nombre: {
        title: 'Cliente',       
      },
      apellido: {
        title: 'Apellido',
      },
      empresa:{
        title:'Empresa'
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
          title: ' <button mat-button class="btn btn-primary"><i class="nb-edit"></i></button>'
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
    private user_service:UserService,
    private router:Router,
    private register:RegisterService,
  ) { }

  ngOnInit() {
    if(this.register.getUserLogged().usr.id_tipo_usuario==0)
    {
     this.user_service.getUsers().subscribe(
      usr=>{this.usrs=usr,console.log(this.usrs)}
    )
    }
    else
    {
      this.router.navigate(['/pages/acceso-denegado']);
    } 
  }
  onCustomAction(event) {
    switch(event.action){
      case'edit':
      this.router.navigate(['pages/detalle-usuario/'+event.data.id_user]);
      break;
      case'delete':
      this.eliminar(event.data.id_user);
      break;
    }
  }
  eliminar(leg:number)
  {
    this.user_a_elim=leg;
    this.open();
  }
  action(status) {
    if(status==='si')
    {
      this.user_service.eliminar_user(this.register.getUserLogged().usr.id_user,this.user_a_elim);
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
