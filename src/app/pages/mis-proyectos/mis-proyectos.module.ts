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
import { MisProyectosComponent } from "./mis-proyectos.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Ng2SmartTableModule } from 'ng2-smart-table';


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
    Ng2SmartTableModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    NbProgressBarModule,
    MatFormFieldModule,
   
    MatInputModule,

    MatToolbarModule,
    ThemeModule,
    RouterModule,
  ],
  declarations: [
    MisProyectosComponent,
    
   
  ],
  providers: [
    
  ],
})
export class MisProyectosModule { }
