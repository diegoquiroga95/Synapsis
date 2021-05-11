import { Component, OnInit } from '@angular/core';
import { Proyecto } from '../proyectos/proyecto';
import { ProyectoService } from '../../proyecto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AreasService } from '../areas/areas.service';
import { Area } from '../areas/area';
import { RegisterService } from '../../register.service';


@Component({
  selector: 'ngx-nav-proyecto',
  templateUrl: './nav-proyecto.component.html',
  styleUrls: ['./nav-proyecto.component.scss']
})
export class NavProyectoComponent implements OnInit {

  auth=[0,1];
  proy:Proyecto;
  areas:Area[];
  leg:number;
  a_elim:number;
  dialogOpened = false;
  permitido=false;
  constructor
  (
  private proyServ:ProyectoService,
  private route:ActivatedRoute,
  private areaServ:AreasService,
  private router:Router,
  private reg:RegisterService
  ) { }

  ngOnInit() {
    if (this.auth.includes(this.reg.getUserLogged().usr.id_tipo_usuario))
    {
        this.permitido=true;
    }
    this.leg = +this.route.snapshot.paramMap.get('legajo');
    this.proyServ.get1Proy(this.leg).subscribe(
      res=>{this.proy=res;}
    );
    this.areaServ.get_areaXproy(this.leg).subscribe(
      res=>{this.areas=res;
        console.log(res)}
    )
  }
  save_leg_mod(id_area:number) 
  {
    this.areaServ.setProyectoAsignado(this.leg);
    let ruta="/pages/crear-area/"+id_area;
    this.router.navigate([ruta]);    
  }
  save_leg_new()
  {
    this.areaServ.setProyectoAsignado(this.leg);
    this.router.navigate(['/pages/crear-area/-1']);
  }
  eliminar(id_area:number)
  {
    this.a_elim=id_area;
    this.open();
  }
  action(status) {
    if(status==='si')
    {
    this.areaServ.b_area(this.a_elim,this.leg);
    this.router.navigate(['/pages/iot-dashboard']);
    }
    this.dialogOpened = false;
  }
  close() {
    this.dialogOpened = false;
  }

  open() {
    this.dialogOpened = true;
  }
  ver(id_area:number)
  {
    let ruta="/pages/areas/"+this.leg+"/"+id_area;
    this.router.navigate([ruta]);
  }
  //routerLink="/pages/areas/{{ar.id_area}}"
}


