import { OnInit,Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../../tareas/tareas.service';


@Component({
  selector: 'ngx-sub-tareas',
  templateUrl: './sub-tareas.component.html',
  styleUrls: ['./sub-tareas.component.scss']
})
export class SubTareasComponent implements OnInit {
  tipo_de_tarea:string = "ST";//ST = subtarea
  id_tarea:number;
  tareas:any;



  constructor(
    private route: ActivatedRoute,
    private TrSrv:TareasService,
    private router:Router) {
      this.id_tarea = +this.route.snapshot.paramMap.get('tarea');
      
     }


  settings = {
    
    columns: {
      prior: {
        title: 'Prioridad',
        sortDirection:'asc',
        width: "50px",
        compareFunction: (dir, a, b) => parseInt(a) >= parseInt(b) ? dir*1 : dir*-1,
      },
      text: {
        title: 'Tarea',       
        
      },
      responsable_n: {
        title: 'Responsable Nombre',
      },
      responsable_a: {
        title: 'Responsable Apellido',
      },
      duration: {
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
      
     
      add: false,
      edit: false,
      delete:false,
    },
  };
  ngOnInit() {
    console.log(this.id_tarea);
   this.TrSrv.getSubTareasGantt(this.id_tarea).subscribe(
     res=>{
      this.tareas = res;
     }
   )
  }
    
  addNewTask(){
    this.TrSrv.get1Tarea(this.id_tarea).subscribe(
      res=>{
        console.log(res);
      this.router.navigate(['/pages/add-sub-tareas/-1/'+res[0]["legajo"] +'/'+ res[0]["id_area"] +'/'+this.id_tarea]);
      }
      )
 
  
  }
  
}
