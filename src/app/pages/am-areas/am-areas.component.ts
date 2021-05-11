import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProyectoService } from '../../proyecto.service';
import { AreasService } from '../areas/areas.service';
import { User } from '../../users';
import { Area } from '../areas/area';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
  selector: 'ngx-am-areas',
  templateUrl: './am-areas.component.html',
  styleUrls: ['./am-areas.component.scss']
})
export class AMAreasComponent implements OnInit {

  @ViewChild(NbPopoverDirective) popoverAreaRepetidad: NbPopoverDirective;

  miembros:Array<User>;
  aom:string="Alta";
  crear_modificar:string='Crear';
  d_area_form:FormGroup;
  result:Area;
  n_area:number;
  n_legajo:number;
  selectedMiembros:any;
  lider:any;
  countSameName:number = 0;
  nombre_original:string;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private proyService: ProyectoService,
    private areaServ:AreasService
  ) 
  {
    this.d_area_form=this.createProyForm(this.fb);
   
  }

  ngOnInit() {
    console.log(this.nombre_original);
    this.n_area = +this.route.snapshot.paramMap.get('area');
    this.n_legajo = this.areaServ.getProyectoAsignado();

    this.proyService.getMemXProy(this.n_legajo).subscribe(
      res=>{
        this.miembros=res
        console.log(res);
       

        }
    )
    if(this.n_area !== -1)
    {

      
      this.crear_modificar='Modificar';
      this.aom="Modificacion de";

      this.areaServ.get_areaXproy(this.n_legajo).subscribe(
        res=>{
            for (let index = 0; index < res.length; index++) {
              if (res[index].id_area===this.n_area ) {
                this.lider =res[index].id_user;
              }
            }
            this.d_area_form.patchValue({
              lider: this.lider
            })

        }
      )
      this.proyService.getMemXArea(this.n_legajo,this.n_area).subscribe(
        res=>{
          console.log(res)
          this.selectedMiembros=res;

        }
      )


      this.areaServ.get_1area(this.n_area,this.n_legajo).subscribe(
        res=>{
          console.log("-----------------")
          console.log(res)
          console.log("-----------------")
          this.nombre_original = res.nombre;
          this.d_area_form.patchValue({
            nombre: res.nombre
          })
        }
      )

      
    }
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  createProyForm(fb:FormBuilder)
  {
    return fb.group({      
      nombre:['', Validators.required],
      lider:['', Validators.required],
      miembros:['', Validators.required],
    });
  }
  onFormSubmit()  
  { 
    
    if(this.n_area === -1)
    {
      this.result = Object.assign({}, this.d_area_form.value);
      console.log(this.result);
      this.areaServ.n_area(this.result);
      this.router.navigate(['/dashboard']);
    }
    else
    {
      this.result = Object.assign({}, this.d_area_form.value);      
      console.log(this.result);
      this.areaServ.m_area(this.result,this.n_area);
      this.router.navigate(['/dashboard']);
    }
  }
  //cambiar cuando tengas tiempo , problema si haces click y borras todo el imput la segunda parte de la funcion de abajo se rompe , esto es para arreglarlo por ahora
  fixCheckRepetidoMouseClick(){
    if(this.countSameName ===0 && this.n_area !==-1 ){
      this.nombre_original = this.d_area_form.controls["nombre"].value;
      this.countSameName = 1;
    }
  }
  checkNombreRepetido(event){
    let tareaNombre=this.d_area_form.get("nombre").value;
    if(this.n_area ===-1){
    this.areaServ.checkForNameTarea(tareaNombre).subscribe(
      res=> {
        console.log(res);
      
          if (res ===1) {

            this.popoverAreaRepetidad.show();
            this.d_area_form.controls["nombre"].setErrors({'incorrect': true});
          } else {
  
            this.popoverAreaRepetidad.hide();
            this.d_area_form.controls["nombre"].setErrors(null);
          }
        
       
      });
    }else{
    
      this.areaServ.checkForNameTarea(tareaNombre).subscribe(
        res=> {
          console.log(res);
            


            if (res === 1 && this.nombre_original !==this.d_area_form.controls["nombre"].value) {

              console.log(this.nombre_original);
              console.log(res);
              this.popoverAreaRepetidad.show();
              this.d_area_form.controls["nombre"].setErrors({'incorrect': true});
            } else {

              console.log(res);
              console.log(this.nombre_original);
              this.popoverAreaRepetidad.hide();
              this.d_area_form.controls["nombre"].setErrors(null);
             

            }
          
         
        });
    }
  }
}

