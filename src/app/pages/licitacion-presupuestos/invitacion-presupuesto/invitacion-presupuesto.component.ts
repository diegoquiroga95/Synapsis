import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MailSenderService } from "../mail-sender.service"
import './ckeditor.loader';
import 'ckeditor';
@Component({
  selector: 'ngx-invitacion-presupuesto',
  templateUrl: './invitacion-presupuesto.component.html',
  styleUrls: ['./invitacion-presupuesto.component.scss']
})
export class InvitacionPresupuestoComponent implements OnInit {
  @ViewChild("myckeditor") ckeditor: any;
  mail_form:FormGroup;
  result: any;
  asunto:string;
  mailRgx:RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  constructor(
    private fb:FormBuilder,
    private mailSrv:MailSenderService,
    ){

      this.mail_form=this.createMailForm(this.fb);
      this.editorValue = "";
   }
 editorValue:any;
  ngOnInit(){
    
  }

  button(){
    console.log(this.editorValue);
  }

  createMailForm(fb:FormBuilder)
  {
    return fb.group({      
      bodyMail:[''],
      toSend:['', [Validators.required,Validators.pattern(this.mailRgx)]],
      cc:[''],
      cco:[''],
      asunto:[''],
    })
  }

  onFormSubmit(){
   
    this.mail_form.controls["bodyMail"].setValue(this.editorValue);
    this.mail_form.controls["asunto"].setValue(this.asunto);
    this.result = Object.assign({}, this.mail_form.value);  
    console.log( this.result);
    this.mailSrv.sendMailData(this.result);
    this.editorValue ="";

  }

}
