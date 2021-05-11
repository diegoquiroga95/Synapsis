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
  NbAccordionModule,
  NbInputModule,
  NbDatepickerModule,
  NbSpinnerModule,
  NbBadgeModule
} from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { AreasComponent } from ".//areas.component";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";

import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgGanttEditorModule } from 'ng-gantt';
import { GanttComponent } from './gantt/gantt.component';
import { ModalTareaComponent } from './modal-tarea/modal-tarea.component';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { ArchivosComponent } from './archivos/archivos.component';
import { SubTareasComponent } from './sub-tareas/sub-tareas.component';
import { AddSubTareasComponent } from './sub-tareas/add-sub-tareas/add-sub-tareas.component';
import { ViewerArchivosComponent } from './viewer-archivos/viewer-archivos.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { ViewerModule } from 'ng2-adsk-forge-viewer';
import { ViewerArchivosDocsComponent } from './viewer-archivos-docs/viewer-archivos-docs.component';




@NgModule({
  imports: [

    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbSpinnerModule,
    NbAccordionModule,
    MatCheckboxModule,
    MatButtonModule,
    DialogsModule,
    ButtonsModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    MatListModule,
    MatPaginatorModule,
    MatGridListModule,
    NbProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    Ng2SmartTableModule,
    MatToolbarModule,
    NbBadgeModule,
    ThemeModule,
    NgGanttEditorModule,
    WindowModule,
    NbInputModule,
    NbDatepickerModule,
    NgxDocViewerModule,
    ViewerModule
  ],
  declarations: [
    AreasComponent,
    GanttComponent,
    ModalTareaComponent,
    ArchivosComponent,
    SubTareasComponent,
    AddSubTareasComponent,
    ViewerArchivosComponent,
    ViewerArchivosDocsComponent,


  ],
  providers: [

  ],
})
export class AreasModule { }
