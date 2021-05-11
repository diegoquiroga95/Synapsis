import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EstadoTarea } from '../../../tareas/estado_tarea';
import { User } from '../../../../users';
import { InputTarea } from '../../../tareas/tareas';
import { ActivatedRoute, Router } from '@angular/router';
import { TareasService } from "../../../tareas/tareas.service";
import { UserService } from "../../../usr-mgmt/user.service";
import { switchMap, startWith } from 'rxjs/operators';
import { interval, Observable } from 'rxjs';
import { NumberCardModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'ngx-add-sub-tareas',
  templateUrl: './add-sub-tareas.component.html',
  styleUrls: ['./add-sub-tareas.component.scss']
})
export class AddSubTareasComponent implements OnInit {

  miembros: User[];
  estado: EstadoTarea[];
  aom: string = "Alta";
  n_tarea: number;
  mod = false;
  sub_tarea_form: FormGroup;
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
  diasEnMes: number;
  id_user: any;
  id_tarea: number;
  legajo: number;
  id_area: number;

  constructor(
    private route: ActivatedRoute,
    private tServ: TareasService,
    private router: Router,
    private fb: FormBuilder,
    private uServ: UserService,) {
    this.id_tarea = +this.route.snapshot.paramMap.get('id');
    this.n_tarea = +this.route.snapshot.paramMap.get('mon');
    this.legajo = +this.route.snapshot.paramMap.get('leg');
    this.id_area = +this.route.snapshot.paramMap.get('area');
    this.sub_tarea_form = this.createProyForm(this.fb);

  }

  ngOnInit() {

    console.log(this.id_area);
    console.log(this.legajo);
    this.tServ.get1Tarea(this.id_tarea).subscribe(
      res => { console.log(res)
               this.sub_tarea_form.patchValue({
          id_responsable: res[0]["responsable_n"],})
      
      });
    this.tServ.getEstadoTareas().subscribe(
      res => { this.estado = res, console.log(this.estado) }
    )
    
    this.uServ.get_userXarea(this.id_area, this.legajo).subscribe(
      res => { this.miembros = res, console.log(this.miembros) }
    )
    // this.tServ.getAllPriorTareas(this.id_area, this.legajo,   this.id_tarea).subscribe(
    //   res => { this.prior_tareas = res, console.log(this.prior_tareas) }
    // );

    console.log(JSON.stringify(this.prior_tareas));


  }
  ngOnDestroy() {

  }

  onFormSubmit() {
    this.result = Object.assign({}, this.sub_tarea_form.value);
    console.log("---------------aca-----------------");
    console.log(this.result);


    switch (this.sub_tarea_form.controls["unidadTiempoSelect"].value) {
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
    this.result.subtarea_de_id = this.id_tarea;
    console.log(this.result.subtarea_de_id );
    if (this.n_tarea === -1)//nueva tarea 
    {


      this.tServ.n_sub_tarea(this.result, this.id_area, this.legajo);
      let ruta = "pages/areas/" + this.legajo + "/"+this.id_area;
      this.router.navigate([ruta]);


    }
    else//editar tarea existente
    {
      // console.log(JSON.stringify(this.result));
      // this.tServ.m_tarea(this.result, this.ayl.save.id_area, this.ayl.save.leg, this.n_tarea);
      // let ruta = "pages/nav-proyecto/" + this.ayl.save.leg;
      // this.router.navigate([ruta]);

    }

  }






  showUt(unidad) {
    this.unidadSelected = unidad;
    console.log(unidad);
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
        subtarea_de_id: [''],
      });
    }
    else if (this.n_tarea === -1) {
      return fb.group({
        titulo: ['', Validators.required],
        id_responsable: ['', Validators.required],
        estado: ['', Validators.required],
        tiempo_estimado: ['', Validators.required],
        unidadTiempoSelect: ['', Validators.required],
        subtarea_de_id: [''],


      });
    }
  }

}
