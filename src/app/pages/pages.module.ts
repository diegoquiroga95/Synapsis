import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';

import { ProyectosModule } from "./proyectos/proyectos.module";
import { UsrMgmtModule } from "./usr-mgmt/usr-mgmt.module";
import { DetalleProyectoModule } from "./detalle-proyecto/detalle-proyecto.module";
import { AccesoDenegadoModule } from "./acceso-denegado/acceso-denegado.module";
import { AsigAreasModule } from "./asig-areas/asig-areas.module";
import { AMAreasModule } from "./am-areas/am-areas.module";
import { AreasModule } from "./areas/areas.module";
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { AmTareasModule } from "./am-tareas/am-tareas.module";
import { DetalleUserModule } from "./detalle-user/detalle-user.module";
import { MisProyectosModule } from "./mis-proyectos/mis-proyectos.module";
import { NavProyectoModule } from "./nav-proyecto/nav-proyecto.module";
import { ProyectosDModule } from "./proyectos-d/proyectos-d.module";
import { ProyectosIModule } from "./proyectos-i/proyectos-i.module";
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule} from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
  import { DialogsModule } from '@progress/kendo-angular-dialog';
  import { ButtonsModule } from '@progress/kendo-angular-buttons';
  import {TimePickerModule} from '@progress/kendo-angular-dateinputs';
  import { NbCardModule } from "@nebular/theme";
  import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_LOCALE  } from 'ng-pick-datetime';

import { TareasModule } from './tareas/tareas.module';
import { TimerModule } from './dashboard/timer/timer.module';
import { ContratistasComponent } from './config-gral/contratistas/contratistas.component';
import { ProveedoresComponent } from './config-gral/proveedores/proveedores.component';
import { ClientesComponent } from './config-gral/clientes/clientes.component';
import { MonedasComponent } from './config-gral/monedas/monedas.component';
import { RubrosComponent } from './config-gral/rubros/rubros.component';
import { UnidadesMedidasComponent } from './config-gral/unidades-medidas/unidades-medidas.component';
import { PlantillaDocumentosComponent } from './config-gral/plantilla-documentos/plantilla-documentos.component';
import { PaisesComponent } from './config-gral/paises/paises.component';
import { GeneracionDocumentosComponent } from './generacion-documentos/generacion-documentos.component';
import { ConfeccionPresupuestoComponent } from './licitacion-presupuestos/confeccion-presupuesto/confeccion-presupuesto.component';
import { ControlDocumentosComponent } from './control-documentos/control-documentos.component';
import { ControlCertificadosComponent } from './control-certificados/control-certificados.component';
import { TableroControlComponent } from './tablero-control/tablero-control.component';
import { HistoriaComponent } from './historia/historia.component';
import { InvitacionPresupuestoModule } from './licitacion-presupuestos/invitacion-presupuesto/invitacion-presupuesto.module';
import { DirectorioModule } from './directorio/directorio.module';
import { ObraCertModule } from './obra-cert/obra-cert.module';





  const PAGES_COMPONENTS = [
    PagesComponent,
    ContratistasComponent,
    ProveedoresComponent,
    ClientesComponent,
    MonedasComponent,
    RubrosComponent,
    UnidadesMedidasComponent,
    PlantillaDocumentosComponent,
    PaisesComponent,
    ConfeccionPresupuestoComponent,
    ControlCertificadosComponent,
    TableroControlComponent,
    HistoriaComponent,

  ];


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    DetalleProyectoModule,
    ProyectosModule,
    MiscellaneousModule,
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    AreasModule,
    MiscellaneousModule,
    MatToolbarModule, MatCheckboxModule, MatButtonModule, MatIconModule,
  MatListModule,MatGridListModule, MatFormFieldModule, MatInputModule,
    NbCardModule,
    DropDownsModule,
    DialogsModule,
    ButtonsModule,
    TimePickerModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    UsrMgmtModule,AccesoDenegadoModule,
    AsigAreasModule,
    AMAreasModule,
    AmTareasModule,
    DetalleUserModule,
    MisProyectosModule,
    NavProyectoModule,
    ProyectosDModule,
    ProyectosIModule,
    TareasModule,
    TimerModule,
    InvitacionPresupuestoModule,
    DirectorioModule,
    ObraCertModule

  ],
  declarations: [
  ...PAGES_COMPONENTS,












  ],
})
export class PagesModule {
}
