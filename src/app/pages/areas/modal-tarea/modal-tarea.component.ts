import { Component, ElementRef, OnInit,Input, ViewChild, ViewEncapsulation,OnDestroy } from '@angular/core';

@Component({
  selector: 'ngx-modal-tarea',
  templateUrl: './modal-tarea.component.html',
  styleUrls: ['./modal-tarea.component.scss']
})
export class ModalTareaComponent implements OnInit {
  dialogOpened:boolean;

  constructor() { }
  @Input() dataToChild:any;
  ngOnInit(): void {
    console.log("desde tarea modal");
  }

  close(){
    console.log("presionando");
    this.dialogOpened = false;

  }

}
