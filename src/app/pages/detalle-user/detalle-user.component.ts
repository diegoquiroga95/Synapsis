import { Component, OnInit } from '@angular/core';
import { Empresa } from '../../../models/empresa';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../register.service';
import { User } from '../../users';
import { UserService } from '../usr-mgmt/user.service';

@Component({
  selector: 'ngx-detalle-user',
  templateUrl: './detalle-user.component.html',
  styleUrls: ['./detalle-user.component.scss']
})
export class DetalleUserComponent implements OnInit {
  aom:string="Alta";
  crear_modificar:string='Registrar';
  empresas:Array<Empresa>;
  d_user_form:FormGroup;
  result:User;
  id_user:number;
  userData:any;
  id_tipo_usuario:number;
  nombreUsr:string;
  apellidoUsr:string;
  empresaUsr:any;
  telefonoUsr:number;
  profesionUsr:string;
  mailUsr:string;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private fb:FormBuilder,
    private register:RegisterService,
    private user_service:UserService
  ) 
  {
    this.d_user_form=this.createUserForm(this.fb);
  }
  ngOnInit() {
    this.id_user = +this.route.snapshot.paramMap.get('id');
    console.log(this.id_user);
    
    this.register.getEmpresa().subscribe(
      emp=>
      {this.empresas=emp;}
    )
    if(this.id_user!=-1)
    {
      this.user_service.get_1User(this.id_user).subscribe(
        usr=>{
          this.userData=usr,
          this.nombreUsr = usr.nombre,
          this.apellidoUsr = usr.apellido,
          this.empresaUsr = usr.empresa,
          this.telefonoUsr = usr.telefono,
          this.profesionUsr = usr.profesion,
          this.mailUsr = usr.profesion,
          this.id_tipo_usuario = usr.id_tipo_usuario,
         
          this.d_user_form.patchValue({
            id_tipo_usuario:this.id_tipo_usuario.toString(),
            empresa:this.empresaUsr.toString()
            
          })
        }
      )
      this.aom="Modificacion de";
      this.crear_modificar="Modificar";
      
    }
  }
  createUserForm(fb:FormBuilder)
  {
    return fb.group({      
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      pass:['', Validators.required],
      id_tipo_usuario:['', Validators.required],
      empresa:['', Validators.required],
      fono:['', Validators.required],
      profesion:['', Validators.required],
      mail:['', Validators.required],
    })
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onFormSubmit()  
  {
    if(this.id_user === -1)
    {
      this.result = Object.assign({}, this.d_user_form.value);      
      this.user_service.n_user(this.result);
      console.log(this.result);
      this.router.navigate(['/dashboard']);
    }
    else
    {
      this.result = Object.assign({}, this.d_user_form.value); 
         
      this.user_service.m_user(this.result,this.id_user);
      this.router.navigate(['/dashboard']);
    }
  }
}
