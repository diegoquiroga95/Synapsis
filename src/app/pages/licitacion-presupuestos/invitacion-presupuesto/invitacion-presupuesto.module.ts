import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvitacionPresupuestoComponent } from "./invitacion-presupuesto.component";
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbRouteTabsetModule
} from '@nebular/theme';
import { CKEditorModule } from 'ng2-ckeditor';

import { ThemeModule } from '../../../@theme/theme.module';
const NEBULAR_MODULES = [
  NbButtonModule,
    NbCardModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    NbRouteTabsetModule,
]

@NgModule({
  declarations: [InvitacionPresupuestoComponent],
  imports: [
    CommonModule,
    ThemeModule,
    ...NEBULAR_MODULES,
    CKEditorModule,
  ]
})
export class InvitacionPresupuestoModule { }
