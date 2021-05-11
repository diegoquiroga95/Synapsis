import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneracionDocumentosComponent } from "./generacion-documentos.component";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';
import { ListaObraCertComponent } from './lista-obra-cert/lista-obra-cert.component';
import { WindowModule } from '@progress/kendo-angular-dialog';

import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';


@NgModule({


  declarations: [GeneracionDocumentosComponent, ListaObraCertComponent],
  imports: [
    Ng2SmartTableModule,
    NbCardModule,
    CommonModule,
    WindowModule,
    DialogsModule,
    ButtonsModule
  ]
})
export class ControDocumentosModule { }
