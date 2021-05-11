import { Component, OnInit,Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from './areas.service';
import { ShowArea } from './area';
import { TareasService } from '../tareas/tareas.service';
import { Tarea, ShowTarea } from '../tareas/tareas';
import { NbThemeService, NbDialogService } from '@nebular/theme';
import { ModalTareaComponent } from "./modal-tarea/modal-tarea.component";

@Component({
  selector: 'ngx-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {
  tareas:ShowTarea[];
  area:ShowArea;
  leg:number;
  id_area:number;
  dialogOpened = false;
  fileWindowOpened = false;
  permitido=true;
  modal:ModalTareaComponent;
  id_tarea:any;
  tipo_de_tarea:string = "T";//se le pasa al componente gant para que vea de donde cargar los datos, tener en cuenta a futuro el complemento gantt al editarlo ya que lo usan el modulo de areas y el de sub tareas



//opciones de la tabla
  settings = {
    
    columns: {
      prior: {
        title: 'Prioridad',
        sortDirection:'asc',
        width: "50px",
        compareFunction: (dir, a, b) => parseInt(a) >= parseInt(b) ? dir*1 : dir*-1,
      },
      titulo: {
        title: 'Tarea',       
        
      },
      responsable_n: {
        title: 'Responsable Nombre',
      },
      responsable_a: {
        title: 'Responsable Apellido',
      },
      tiempo_estimado: {
        title: 'Tiempo estimado de tarea',
        valuePrepareFunction: (value) =>{
          let tiempoTotalEnMin = value;
          tiempoTotalEnMin /= 60;
          return tiempoTotalEnMin +" Horas"
        }
      },
      tiempo_real: {
        title: 'Tiempo Actual',
      },
      estado: {
        title: 'Estado',
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
          name: 'archivos',
          title: '<button mat-icon-button><i class="nb-compose"></i></button> </td>'
        },{
          name: 'edit',
          title: '<i class="nb-edit"></i>'
        },
       
        {
          name: 'delete',
          title: '<button mat-icon-button><i class="nb-trash"></i></button> </td>'
        },
       
        {
          name: 'sub-tareas',
          title: '<button mat-icon-button><i class="nb-list"></i></button> </td>'
        }
      ],
      add: false,
      edit: false,
      delete:false,
    },
  };

  constructor(
    private route:ActivatedRoute,
    private areaServ:AreasService,
    private tareaServ:TareasService,
    private router:Router,
    //por el momento como esta el codigo y al usar kendo como ui component  hacer esto para escuchar el cambio de thema de la app y cambiar el color
    //lo dejo de ejemplo para un futuro en el caso de que se lo necesite,
    private themeService: NbThemeService,

  ) { 
    
  }
 
 

  ngOnInit() { 
    this.id_area = +this.route.snapshot.paramMap.get('area');
    this.leg=+this.route.snapshot.paramMap.get('legajo');
    this.tareaServ.getTareas(this.id_area,this.leg).subscribe(
      res=>{this.tareas=res,console.log(this.tareas)}
    );
    this.areaServ.get_1area(this.id_area,this.leg).subscribe(
      res=>{this.area=res, console.log(this.area)}
    );
    
  }
  
  save_leg_new()
  {
    this.tareaServ.setAreaYProy(this.leg,this.id_area);
    this.router.navigate(['/pages/AMtareas/-1']);
  }
  mod_tarea(id_tarea:number)
  {
    this.tareaServ.setAreaYProy(this.leg,this.id_area);
    let ruta='/pages/AMtareas/'+id_tarea;
    this.router.navigate([ruta]);
  }
  eliminar_tarea(id_tarea:number)
  {
    this.openModal();
    this.tareaServ.eliminar_tarea(id_tarea);
    let ruta='pages/nav-proyecto/'+this.leg;
    this.router.navigate([ruta]);
  }




  action(status) {
    if(status==='si')
    {
      console.log("si");
      console.log(this.id_tarea);
      this.eliminar_tarea(this.id_tarea);
    }
    this.dialogOpened = false;
  }

  archivosAction(status) {
    if(status==='hola')
    {
      console.log("hola");
   
    }else if (status==="chau") {
      console.log("chau");
    } else {
      console.log("?????");
    }
    this.fileWindowOpened = false;
  }

  archivosWindowClose() {
  
    this.fileWindowOpened = false;
  }

  close() {
    this.dialogOpened = this.modal.dialogOpened;
    console.log(this.dialogOpened);
  }

  openModal() {
    this.dialogOpened = true;
  }

  openFileModal() {
    this.fileWindowOpened = true;
  }

  onCustomAction(event) {
    switch(event.action){
      case'edit':
      this.mod_tarea(event.data.id_tarea);
      break;
      case'archivos':
      this.id_tarea = event.data.id_tarea;
      console.log("archivos");
      this.openFileModal()
      break;
      case'delete':
      this.id_tarea = event.data.id_tarea;
      this.openModal();
      break;
      case 'sub-tareas':
        this.id_tarea = event.data.id_tarea;
        let ruta='pages/sub-tareas/'+this.id_tarea;
        this.router.navigate([ruta]);
      break;

    }
  }
  
}
