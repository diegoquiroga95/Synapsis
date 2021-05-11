import { Component, OnInit, Input } from '@angular/core';
import { RegisterService } from "../../../register.service";

@Component({
  selector: 'ngx-am-compania-persona',
  templateUrl: './am-compania-persona.component.html',
  styleUrls: ['./am-compania-persona.component.scss']
})
export class AmCompaniaPersonaComponent implements OnInit {
@Input() personaOcompania:boolean;
empresas:any;
  constructor(private RegSrv:RegisterService) { }

  ngOnInit() {
    this.RegSrv.getEmpresa().subscribe(
      res=>{
        this.empresas =res;
      }
    )
  }

}
