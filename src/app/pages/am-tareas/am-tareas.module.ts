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
  NbDatepickerModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { AmTareasComponent } from "./am-tareas.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    MatCheckboxModule,
    MatButtonModule,
    TimePickerModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    NbProgressBarModule,
    MatFormFieldModule,
    DropDownsModule,
    MatInputModule,
    DialogsModule,
    ButtonsModule,
    MatToolbarModule,
    ThemeModule,
    NbDatepickerModule
  ],
  declarations: [
    AmTareasComponent,
    
   
  ],
  providers: [
    
  ],
})
export class AmTareasModule { }
