import { NgModule } from '@angular/core';
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

import { Routes, RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { AccesoDenegadoComponent } from "./acceso-denegado.component";


import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
  import { DialogsModule } from '@progress/kendo-angular-dialog';
  import { ButtonsModule } from '@progress/kendo-angular-buttons';
  import {TimePickerModule} from '@progress/kendo-angular-dateinputs';

@NgModule({
  imports: [
    
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    
    TimePickerModule,
   
    NbProgressBarModule,
    
    DropDownsModule,
    
    DialogsModule,
    ButtonsModule,

    ThemeModule,
     RouterModule, 
  ],
  declarations: [
    AccesoDenegadoComponent,
    
   
  ],
  providers: [
    
  ],
})
export class AccesoDenegadoModule { }
