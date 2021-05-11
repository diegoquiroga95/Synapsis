import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation, OnDestroy, Input } from '@angular/core';

import "dhtmlx-gantt";
import { gantt } from 'dhtmlx-gantt';

import { TaskService } from "./task.service";
import { LinkService } from "./link.service";
import { TareasService } from '../../tareas/tareas.service';
import { Tarea, ShowTarea, ShowTareaGantt } from '../../tareas/tareas';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'gantt',
  styleUrls: ['./gantt.component.scss'],
  template: `<input class="btn btn-primary" id="fullscreen_button" type="button" value="Toggle Fullscreen"/><div #ganttHere style='width: 100%; height: 500px;'></div> `,
  providers: [TaskService, LinkService],
})
export class GanttComponent implements OnInit, OnDestroy {
  @ViewChild('ganttHere', { static: true }) ganttContainer: ElementRef<any>;
  @Input() tipo_de_tarea:any;
  @Input() id_tarea:number;

  tareasGantt: ShowTareaGantt[];
  leg: number;
  id_area: number;
  task: any

  constructor(
    private taskService: TaskService,
    private linkService: LinkService,
    private tareaServ: TareasService,
    private route: ActivatedRoute,
    private ruter: Router,) { }
  ngOnDestroy(): void {
    gantt.clearAll();
  }

  ngOnInit() {

    this.id_area = +this.route.snapshot.paramMap.get('area');
    this.leg = +this.route.snapshot.paramMap.get('legajo');


   switch (this.tipo_de_tarea) {
     case "T":
      this.tareaServ.getTareasGantt(this.id_area, this.leg).subscribe(
        res => {
          this.tareasGantt = res,
            console.log(JSON.stringify(this.tareasGantt)),
            gantt.parse({
              data: this.tareasGantt,
              links: [
              ]
            });
        }
  
      );
       break;
      case "ST":
        this.tareaServ.getSubTareasGantt(this.id_tarea).subscribe(
          res => {
            this.tareasGantt = res,
              console.log(JSON.stringify(this.tareasGantt)),
              gantt.parse({
                data: this.tareasGantt,
                links: [
                ]
              });
          }
    
        );
        break;
     default:
       console.log("error!!!");
       break;
   }


    gantt.setWorkTime({ hours: ["8:00-16:00"] });
    gantt.config.work_time = true;
    gantt.config.scale_height = 90;
    gantt.config.sort = true;

    gantt.config.readonly = true;
    gantt.config.date_format = "%Y-%m-%d %H:%i";
    //lenguaje del gantt
    gantt.i18n.setLocale("es");
    //unidad de medida de tareas (minute,hour,day,week) 
    gantt.config.duration_unit = "minute";

    gantt.config.columns = [
      { name: "prior", label: "Prioridad", width: 30, align: "left" },
      { name: "text", label: "Nombre", width: 100, tree: true },
      { name: "start_date", label: "Fecha de Inicio", width: 150, align: "center" },
      { name: "progress", label: "%", width: 80, align: "center" },
      { name: "responsable_n", label: "Nombre", width: 80, align: "center" },
      { name: "responsable_a", label: "Apellido", width: 80, align: "center" }
    ];



    gantt.config.scales = [
      { unit: "month", step: 1, format: "%F, %Y" },
      {
        unit: "week", step: 1, format: function (date) {
          return "Week #" + getWeekOfMonthNumber(date);
        }
      },
      { unit: "day", step: 1, format: "%j %D" },
      {
        unit: "hour", step: 1, format: "%H", css: function (date) {
          if (!gantt.isWorkTime(date)) {
            return "week-end";
          }
        }
      },
    ];

    function getWeekOfMonthNumber(date) {
      let adjustedDate = date.getDate() + date.getDay();
      let prefixes = ['0', '1', '2', '3', '4', '5'];
      return (parseInt(prefixes[0 | adjustedDate / 7]) + 1);
    }



    gantt.templates.tooltip_text = function (start, end, task) {
      return "<b>Tarea:</b> " + task.text + "<br/><b>Responsable:</b> " + task.responsable_a + " " + task.responsable_n + "<br/><b>Duracion:</b> " + task.duration + "Min" + "<br/><b>Fecha Inicio:</b> " + task.start_date + "<br/><b>Fecha de Finalizacion:</b> " + task.end_date;
    };

    gantt.plugins({
      fullscreen: true,
      tooltip: true,
      marker: true
    });

    var dateToStr = gantt.date.date_to_str(gantt.config.task_date);
    var markerId = gantt.addMarker({
      start_date: new Date(), //a Date object that sets the marker's date
      css: "today", //a CSS class applied to the marker
      text: "Now", //the marker title
      title: dateToStr(new Date()) // the marker's tooltip
    });

    var button = document.getElementById("fullscreen_button");
    button.addEventListener("click", function () {
      if (!gantt.getState().fullscreen) {
        // expanding the gantt to full screen
        gantt.expand();

        
      }
      else {
        // collapsing the gantt to the normal mode
        gantt.collapse();
    
        
      }
    }, false);

    gantt.attachEvent("onExpand", function (){
      console.log("dong");
  }, false);
  gantt.attachEvent("onCollapse", function (){
    console.log("NOT dong");
}, false);
    //Dibuja el Grafico
    gantt.init(this.ganttContainer.nativeElement);
    gantt.sort("prior",true);
    gantt.sort("responsable_n",true);


  
///////////////////////////

    //escalas de unidades de la linea de tiempo gantt
    // gantt.config.scales = [
    //   { unit: "month", step: 1, format: "%F, %Y" },
    //   {
    //     unit: "week", step: 1, format: function (date) {
    //       return "Week #" + getWeekOfMonthNumber(date);
    //     }
    //   },
    //   {
    //     unit: "day", step: 1, format: "%j %D", css: function(date) {
    //       if(!gantt.isWorkTime(date)){
    //         console.log(gantt.isWorkTime(date));
    //           return "weekend";
    //       }
    //  }}
    // ];











    //ejemplo de data y formato de data
    //   gantt.parse({
    //     data: [
    //       { "id": 11, "text": "Project #1", "type": "project", "progress": 0.6, "open": true,"complete":"20" },

    //       { "id": 12, "text": "Task #1", "start_date": "03-04-2018", "duration": "72", "parent": "11", "progress": 1, "open": true ,"jamaica":"cucucuc"},
    //       { "id": 13, "text": "Task #2", "start_date": "03-04-2018", "type": "project", "parent": "11", "progress": 0.5, "open": true },
    //       { "id": 14, "text": "Task #3", "start_date": "02-04-2018", "duration": "6", "parent": "11", "progress": 0.8, "open": true },
    //       { "id": 15, "text": "Task #4", "type": "project", "parent": "11", "progress": 0.2, "open": true },
    //       { "id": 16, "text": "Final milestone", "start_date": "15-04-2018", "type": "milestone", "parent": "11", "progress": 0, "open": true },

    //       { "id": 17, "text": "Task #2.1", "start_date": "03-04-2018", "duration": "2", "parent": "13", "progress": 1, "open": true },
    //       { "id": 18, "text": "Task #2.2", "start_date": "06-04-2018", "duration": "3", "parent": "13", "progress": 0.8, "open": true },
    //       { "id": 19, "text": "Task #2.3", "start_date": "10-04-2018", "duration": "4", "parent": "13", "progress": 0.2, "open": true },
    //       { "id": 20, "text": "Task #2.4", "start_date": "10-04-2018", "duration": "4", "parent": "13", "progress": 0, "open": true },
    //       { "id": 21, "text": "Task #4.1", "start_date": "03-04-2018", "duration": "4", "parent": "15", "progress": 0.5, "open": true },
    //       { "id": 22, "text": "Task #4.2", "start_date": "03-04-2018", "duration": "4", "parent": "15", "progress": 0.1, "open": true },
    //       { "id": 23, "text": "Mediate milestone", "start_date": "14-04-2018", "type": "milestone", "parent": "15", "progress": 0, "open": true }
    //     ],
    //     links: [
    //       { "id": "10", "source": "11", "target": "12", "type": "1" },
    //       { "id": "11", "source": "11", "target": "13", "type": "1" },
    //       { "id": "12", "source": "11", "target": "14", "type": "1" },
    //       { "id": "13", "source": "11", "target": "15", "type": "1" },
    //       { "id": "14", "source": "23", "target": "16", "type": "0" },
    //       { "id": "15", "source": "13", "target": "17", "type": "1" },
    //       { "id": "16", "source": "17", "target": "18", "type": "0" },
    //       { "id": "17", "source": "18", "target": "19", "type": "0" },
    //       { "id": "18", "source": "19", "target": "20", "type": "0" },
    //       { "id": "19", "source": "15", "target": "21", "type": "2" },
    //       { "id": "20", "source": "15", "target": "22", "type": "2" },
    //       { "id": "21", "source": "15", "target": "23", "type": "0" }
    //     ]
    //   });
  }

navigateSubTareas(id):any{
  console.log("sub tareas function");
  let ruta = "pages/sub-area/" + id;
  this.ruter.navigate([ruta]);
}

}


