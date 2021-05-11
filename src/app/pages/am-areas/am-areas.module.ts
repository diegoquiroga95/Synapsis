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
  NbInputModule,
  NbPopoverModule,
} from '@nebular/theme';

import { Routes, RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { AMAreasComponent } from "./am-areas.component";


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
    NbInputModule,
    NbPopoverModule,
    TimePickerModule,
   
    NbProgressBarModule,
    
    DropDownsModule,
    
    DialogsModule,
    ButtonsModule,

    ThemeModule,
     RouterModule, 
  ],
  declarations: [
    AMAreasComponent,
    
   
  ],
  providers: [
    
  ],
})
export class AMAreasModule { }
