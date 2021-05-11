import { Component, OnInit, ViewChild } from '@angular/core';
import {Proyecto} from "../proyectos/proyecto";
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';  

import { User } from '../../users';
import {ProyectoService} from "../../proyecto.service";
import { NbSidebarService } from '@nebular/theme';
import { AreasService } from '../areas/areas.service';
import { RegisterService } from '../../register.service';
import { NbPopoverDirective } from '@nebular/theme';
import { NbTooltipDirective } from "@nebular/theme"
import { NbDateService} from "@nebular/theme";

@Component({
  selector: 'app-detalle-proyecto',
  templateUrl: './detalle-proyecto.component.html',
  styleUrls: ['./detalle-proyecto.component.scss']
})
export class DetalleProyectoComponent implements OnInit {
  
  @ViewChild(NbPopoverDirective) popoverLegajoaRepetidad: NbPopoverDirective;
  @ViewChild(NbTooltipDirective) tooltipNombreRepetidad: NbTooltipDirective;

  legajo:number=null;
  nombre:string="";
  clienteNombreId:any;
  estadoNombreId:any;
  clientes:Array<User>;
  miembros:Array<User>;
  miembrosProy:any;
  fechaInicio:any;
  min: Date;
  /*
  cliente:User[];
  miembro:User[];
  */
  d_proy_form:FormGroup;
  dialogOpened = false;
  result:Proyecto;
  aom:string="Alta";
  crear_modificar:string='Crear';
  inac=false;
  modif:boolean = true;
  countSameName: number =0;
  nombre_original: any;


  constructor(
    private proyService: ProyectoService,
    private sidebarService:NbSidebarService,
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private asig:AreasService,
    private registerService:RegisterService,
    private datePipe: DatePipe,
    protected dateService:NbDateService<Date>) // ver injectable
    {
      this.d_proy_form=this.createProyForm(this.fb);
      let today=  new Date();
      today.setDate(today.getDate() - 1);
      this.min = new Date (today);
      
    
    }

  ngOnInit() {
    //funcion que trae user logueado
    console.log(this.registerService.getUserLogged())
    const leg = +this.route.snapshot.paramMap.get('legajo');
    console.log(this.modif);
    this.proyService.getCli().subscribe(
      res=>{this.clientes=res 
        console.log(res);
      }
    )
    this.proyService.getMem().subscribe(
      res=>{
        this.miembros=res;
        console.log(this.miembros)
        }
    )

    if(leg !== -1)
    {
      this.modif = false;
      console.log(this.modif);
      this.crear_modificar='Modificar';
      this.aom="Modificacion de";
      this.inac=true;
      console.log("-----");

      this.proyService.getMemXProy(leg).subscribe(
        res=>{
          this.miembrosProy=res,
          console.log(this.miembrosProy),
          console.log(this.miembrosProy.length)}
      )

      this.proyService.get1Proy(leg).subscribe(
        res=>{
          console.log(res);
          this.legajo=res.legajo;
          this.nombre=res.nombre;
          this.estadoNombreId=res.idEstado;
          this.clienteNombreId=res.idcliente;
          this.fechaInicio=res.fecha_inicio;          
          this.d_proy_form.patchValue({
            cliente:this.clienteNombreId.toString(),
            estado: this.estadoNombreId.toString(),
            
          })
         
        }
      );
      console.log("--*********---")
      
    }
    
  }
  print(){console.log("hokla")}
  onFormSubmit()  
  { 
    const leg = +this.route.snapshot.paramMap.get('legajo');

    if(leg === -1)
    { 
     this.result = Object.assign({}, this.d_proy_form.value);
     console.log(this.result);
     this.proyService.n_proy(this.result);
     this.open();
    }
    else
    {
      this.result = Object.assign({}, this.d_proy_form.value); 
      this.proyService.m_proy(this.result,this.legajo);
      this.router.navigate(['/dashboard']);
    }
  }

  createProyForm(fb:FormBuilder)
  {
    return fb.group({
      legajo:[this.legajo, Validators.required],
      nombre:[this.nombre, Validators.required],
      cliente:['', Validators.required],
      fechaInicioProy:['', Validators.required],
      miembros:['', Validators.required],
      estado:'',
      comment:['', Validators.required]
    });
    
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  toggle() {
    this.sidebarService.toggle();
  }
  close() {
    this.dialogOpened = false;
  }

  open() {
    this.dialogOpened = true;
  }

  action(status) {
    if(status==='si')
    {
      this.asig.setProyectoAsignado(this.result.legajo);
      this.router.navigate(['/pages/asignar-area']);      
    }
    else
    {
      this.router.navigate(['/dashboard']);
    }
    this.dialogOpened = false;
  }



  fixCheckRepetidoMouseClick(){
    const leg = +this.route.snapshot.paramMap.get('legajo');
    if(this.countSameName ===0 && leg !==-1 ){
      this.nombre_original = this.d_proy_form.controls["nombre"].value;
      
      this.countSameName = 1;
    }
    console.log(this.nombre_original);
    console.log(this.countSameName);
  }
  checkNombreRepetido(){
    let proyectoNombre = this.d_proy_form.get("nombre").value;
    const leg = +this.route.snapshot.paramMap.get('legajo');
    if(leg === -1){
      console.log("-1");
      this.proyService.buscarNombreRepetido(proyectoNombre).subscribe(
        res=>{
          if(res ===1){
            console.log("repetido");
            this.tooltipNombreRepetidad.show();
            this.d_proy_form.controls["nombre"].setErrors({'incorrect': true});
          }else{

            console.log("libre");
            this.tooltipNombreRepetidad.hide();
            this.d_proy_form.controls["nombre"].setErrors(null);
          
          }
        }
      )
  
    }else{
      console.log("otro");
      this.proyService.buscarNombreRepetido(proyectoNombre).subscribe(
        res=>{
          if(res ===1 && this.nombre_original !==this.d_proy_form.get("nombre").value){
            
            console.log("repetido");
            this.tooltipNombreRepetidad.show();
            this.d_proy_form.controls["nombre"].setErrors({'incorrect': true});
          }else{


            console.log("libre");
            this.tooltipNombreRepetidad.hide();
            this.d_proy_form.controls["nombre"].setErrors(null);
           
          }
        }
      )

    }




   


  }
  checkLegajoRepetido(){
    let legajo = this.d_proy_form.controls["legajo"].value;
    this.proyService.buscarLegajoRepetido(legajo).subscribe(
      res=>{ 
        if(res===0){
          this.popoverLegajoaRepetidad.hide();
          console.log("no repetido");
          this.d_proy_form.controls["legajo"].setErrors(null);

        }else{
          this.popoverLegajoaRepetidad.show();
          this.d_proy_form.controls["legajo"].setErrors({'incorrect': true});
          console.log("repetid0");
        }
      }
    )
    
  }
}