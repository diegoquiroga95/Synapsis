import { Component, OnInit, Input } from '@angular/core';
import { TimerService } from "./timer.service";
import { TareasService} from "../../tareas/tareas.service";
import {ShowTarea} from "../../tareas/tareas";
import * as moment from 'moment'
import { MAT_INPUT_VALUE_ACCESSOR } from '@angular/material/input';


@Component({
  selector: 'ngx-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  @Input() idUser: number;
  @Input() tareasMensaje: boolean;
  paradoAsec:number =0;
  userTasks:ShowTarea[];
  idTarea:number;
  settings = {
    
    columns: {
     
      id_tarea: {
        title: 'Id Tarea',       
        
      },
      titulo: {
        title: 'Nombre de Tarea',
      },
      tiempo: {
        title: 'Tiempo trabajado',
        valuePrepareFunction: (value) =>{
          let totalSeconds = value;
          let hours:any = Math.floor(totalSeconds / 3600);
          totalSeconds %= 3600;
          let minutes:any = Math.floor(totalSeconds / 60);
          let seconds:any = totalSeconds % 60;

          if(seconds<10){
            seconds = "0"+seconds;
          }
          if(minutes<10){
            minutes = "0"+minutes;
          }
          if(hours<10){
            hours = "0"+hours;
          }
          return hours+":"+minutes+":"+seconds
        }
      },
      tiempo_estimado: {
        title: 'Tiempo estimado De Fin',
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
          name: 'start',
          title: '<button mat-icon-button><i class="nb-play"></i></button> </td>'
        },{
          name: 'stop',
          title: '<i class="nb-edit"></i>'
        },
       
        {
          name: 'delete',
          title: '<button mat-icon-button><i class="nb-trash"></i></button> </td>'
        },
      ],
      add: false,
      edit: false,
      delete:false,
    },
  };
  
  constructor(
    public tmrSrv:TimerService,
    public tareaSrv:TareasService
    ) { 
       this.userTasks = this.tareaSrv.tareasUser;
    }

  

  ngOnInit() {

    this.tareaSrv.subsTareaXuser(this.idUser);
    if(this.tareasMensaje===true){
      this.startTimer(0);
    }

  }


  onCustomAction(event) {
    switch(event.action){
      case'start':
      console.log("start");
      this.startTimer(event.data.id_tarea);
      
      break;
      case'stop':
      console.log("stop");
      this.stopTimer(event.data.id_tarea);
      break;
      case'delete':
      console.log("delete");
      // this.id_tarea = event.data.id_tarea;
      // this.openModal();
      break;
    }
  }



  startTimer(id_tarea){
    console.log("iniciando");
    this.tareasMensaje = true;
    this.idTarea = id_tarea;
    this.paradoAsec=this.tmrSrv.count(0);
    this.tmrSrv.playTarea(id_tarea,this.idUser);
    
 
  }

  stopTimer(id_tarea){
    
    console.log("stopeada idtarea : "+ id_tarea);
    this.tareasMensaje = false;
    
    this.paradoAsec =this.tmrSrv.getTime();
    this.tmrSrv.stopTarea(id_tarea);
    this.tareaSrv.getSubsTareaXuser(this.idUser);
   // console.log("!!!!!!!!!!!!!!!!!!!!!!!!!"+this.paradoAsec+"!!!!!!!!!!!!!!!!!!!!!!!!!");
  }

  pauseTimer(){
    console.log("pausada");
    
    this.tmrSrv.pauseTimer();
  }

  resumeTimer(){
    this.tmrSrv.resumeTimer();
  }
  


  



 

}
