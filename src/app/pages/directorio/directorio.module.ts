import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbButtonModule,
  NbCardModule,
  NbTabsetModule,

  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbInputModule,
  NbPopoverModule,
  NbLayoutModule,
  NbSidebarModule,
  NbMenuModule,
  NbAccordionModule
} from '@nebular/theme';

import { DirectorioComponent } from "./directorio.component";
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DirectorioProyectoComponent } from './directorio-proyecto/directorio-proyecto.component';
import { AmCompaniaPersonaComponent } from './am-compania-persona/am-compania-persona.component';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';



const NEBULAR_MODULES = [
NbButtonModule,
NbCardModule,
NbTabsetModule,
NbIconModule,
NbSelectModule,
NbListModule,
NbInputModule,
NbPopoverModule,
NbLayoutModule,
NbSidebarModule,
NbMenuModule,
NbAccordionModule
]
const KENDO_MODULES = [
  DialogsModule,
  ButtonsModule,
  WindowModule,
  DropDownsModule,
]

@NgModule({

  declarations: [DirectorioComponent, DirectorioProyectoComponent, AmCompaniaPersonaComponent], 
  imports: [
    CommonModule,
    ...NEBULAR_MODULES,
    Ng2SmartTableModule,
    ...KENDO_MODULES,
  ]
})
export class DirectorioModule { }
