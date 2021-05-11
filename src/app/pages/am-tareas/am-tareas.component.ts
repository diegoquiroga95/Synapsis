import { Component, OnInit } from '@angular/core';
import { User } from '../../users';
import { EstadoTarea } from '../tareas/estado_tarea';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from '../tareas/tareas.service';
import { UserService } from '../usr-mgmt/user.service';
import { SaveLAData } from '../areas/area';
import { InputTarea } from '../tareas/tareas';
import * as moment from 'moment'
@Component({
  selector: 'ngx-am-tareas',
  templateUrl: './am-tareas.component.html',
  styleUrls: ['./am-tareas.component.scss']
})
export class AmTareasComponent implements OnInit {
  ayl: any;
  miembros: User[];
  estado: EstadoTarea[];
  aom: string = "Alta";
  n_tarea: number;
  mod = false;
  d_tarea_form: FormGroup;
  crear_modificar: string = 'Crear';
  result: InputTarea;
  tarea: any[];
  nombreTarea: any;
  responsableTarea: any;
  prioridadTarea: any;
  hrsEstimado: any;
  selectedOption: number;
  originalUser: any;
  orgUser: any;
  prior_tareas: any;
  unidadT: any = [{ unidad: "hora" }, { unidad: "dias" }, { unidad: "meses" }];
  unidadSelected: any;
  diasEnMes:number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tServ: TareasService,
    private uServ: UserService,
  ) {
    this.d_tarea_form = this.createProyForm(this.fb);

  }

  ngOnInit() {

    this.n_tarea = +this.route.snapshot.paramMap.get('id');
    if (this.n_tarea !== -1) {
      this.crear_modificar = 'Modificar';
      this.aom = "Modificacion de";
      this.mod = true;
      console.log(this.n_tarea);
      this.tServ.get1Tarea(this.n_tarea).subscribe(
        res => {
          console.log(res);
          this.tarea = res,

            this.nombreTarea = this.tarea[0].titulo;

          this.originalUser = this.tarea[0].id_responsable;
          console.log(this.tarea[0].id_estado);
          //dividir tiempo estimado por 60 calcular si son mas de 8 hs poner el select en dias si no es hs
          this.hrsEstimado = this.tarea[0].tiempo_estimado / 60;



          this.d_tarea_form.patchValue({
            id_responsable: this.tarea[0].id_responsable,
            estado: this.tarea[0].id_estado,
            prioridad: this.tarea[0].prior,
            unidadTiempoSelect: "hora",

          })
          if (this.d_tarea_form.controls["unidadTiempoSelect"].value === "hora") {
            console.log("esta en horas");
          } else {
            console.log("esta en dias");
          }
          console.log(JSON.stringify(this.originalUser));
        }
      );

    }




    this.ayl = this.tServ.getAreaYProy();
    console.log(this.n_tarea);
    console.log(JSON.stringify(this.originalUser));
    console.log(this.ayl.leg);
    console.log(this.ayl.id_area);
    this.tServ.removeAreaYProy();

    this.tServ.getEstadoTareas().subscribe(
      res => { this.estado = res, console.log(this.estado) }
    )

    this.uServ.get_userXarea(this.ayl.save.id_area, this.ayl.save.leg).subscribe(
      mem => { this.miembros = mem, console.log(this.miembros) }
    )
    this.tServ.getAllPriorTareas(this.ayl.save.id_area, this.ayl.save.leg, this.n_tarea).subscribe(
      res => { this.prior_tareas = res, console.log(this.prior_tareas) }
    );
    console.log(JSON.stringify(this.prior_tareas));

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  createProyForm(fb: FormBuilder) {
    if (this.n_tarea !== -1) {

      return fb.group({
        titulo: ['', Validators.required],
        id_responsable: ['', Validators.required],
        estado: ['', Validators.required],
        prioridad: [''],
        tiempo_estimado: ['', Validators.required],
        unidadTiempoSelect: ['', Validators.required],
      });
    }
    else if (this.n_tarea === -1) {
      return fb.group({
        titulo: ['', Validators.required],
        id_responsable: ['', Validators.required],
        estado: ['', Validators.required],
        tiempo_estimado: ['', Validators.required],
        unidadTiempoSelect: ['', Validators.required],


      });
    }
  }



  checkOriginalUser(tu) {
    console.log(tu);
    //this.orgUser =JSON.stringify(this.originalUser);
    console.log(typeof this.orgUser);
    console.log(this.orgUser);
    console.log("fix?");//fix
    if (this.orgUser === 12) {
      this.tServ.getAllPriorTareas(this.ayl.save.id_area, this.ayl.save.leg, 2278).subscribe(
        res => { this.prior_tareas = res, console.log(this.prior_tareas) }
      );
    } else {
      this.tServ.getAllPriorTareas(this.ayl.save.id_area, this.ayl.save.leg, this.n_tarea).subscribe(
        res => { this.prior_tareas = res, console.log(this.prior_tareas) }
      );

    }

  }

  onFormSubmit() {
    this.result = Object.assign({}, this.d_tarea_form.value);
    console.log("---------------aca-----------------");
    console.log(this.result);


    switch (this.d_tarea_form.controls["unidadTiempoSelect"].value) {
      case "hora":
        console.log(Number(this.result.tiempo_estimado) * 60);//1 hr = 60min
        this.result.tiempo_estimado = (Number(this.result.tiempo_estimado) * 60).toString();
        break;
      case "dias":
        console.log(Number(this.result.tiempo_estimado) * 480);//1dia = 480 min
        this.result.tiempo_estimado = (Number(this.result.tiempo_estimado) * 480).toString();

        break;
      case "meses":
        console.log(this.diasEnMes);
        console.log(Number(this.result.tiempo_estimado) * 480 * this.diasEnMes);//1dia = 480 min
        this.result.tiempo_estimado = (Number(this.result.tiempo_estimado) * 480 * this.diasEnMes).toString();

        break;
    }
    console.log("---------------aca-----------------");

    if (this.n_tarea === -1)//nueva tarea 
    {
      this.tServ.n_tarea(this.result, this.ayl.save.id_area, this.ayl.save.leg);
      let ruta = "pages/nav-proyecto/" + this.ayl.save.leg;
      this.router.navigate([ruta]);
    }
    else//editar tarea existente
    {
      console.log(JSON.stringify(this.result));
      this.tServ.m_tarea(this.result, this.ayl.save.id_area, this.ayl.save.leg, this.n_tarea);
      let ruta = "pages/nav-proyecto/" + this.ayl.save.leg;
      this.router.navigate([ruta]);

    }
  }

  showUt(unidad) {
    this.unidadSelected = unidad;
    console.log(unidad);
  }

}



//this.ayl.save.id_area,this.ayl.save.leg
// let ruta="/pages/areas/"+this.ayl.save.id_area+"/"+this.ayl.save.leg;
//     this.router.navigate([ruta]);