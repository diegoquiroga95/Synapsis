import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,NbInputModule,
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { DetalleUserComponent } from "./detalle-user.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';


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
    
    NbInputModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    NbProgressBarModule,
    MatFormFieldModule,
   
    MatInputModule,

    MatToolbarModule,
    ThemeModule,
  ],
  declarations: [
    DetalleUserComponent,
    
   
  ],
  providers: [
    
  ],
})
export class DetalleUserModule { }
