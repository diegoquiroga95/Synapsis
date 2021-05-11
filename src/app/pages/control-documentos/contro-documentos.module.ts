import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlDocumentosComponent } from "./control-documentos.component";
import { Ng2SmartTableModule } from 'ng2-smart-table';



@NgModule({


  declarations: [ControlDocumentosComponent],
  imports: [
    Ng2SmartTableModule,
  ]
})
export class ControDocumentosModule { }
