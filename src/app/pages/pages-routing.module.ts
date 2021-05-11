import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ProyectosComponent } from "./proyectos/proyectos.component";
import { UsrMgmtComponent } from "./usr-mgmt/usr-mgmt.component";
import { DetalleProyectoComponent } from "./detalle-proyecto/detalle-proyecto.component";
import { AccesoDenegadoComponent } from "./acceso-denegado/acceso-denegado.component";
import { AsigAreasComponent  } from "./asig-areas/asig-areas.component";
import { AreasComponent } from "./areas/areas.component";
import { AMAreasComponent } from "./am-areas/am-areas.component";
import { AmTareasComponent } from "./am-tareas/am-tareas.component";
import { DetalleUserComponent } from "./detalle-user/detalle-user.component";
import { MisProyectosComponent } from "./mis-proyectos/mis-proyectos.component";
import { NavProyectoComponent } from "./nav-proyecto/nav-proyecto.component";
import { ProyectosDComponent } from "./proyectos-d/proyectos-d.component";
import { ProyectosIComponent } from "./proyectos-i/proyectos-i.component";
import { TareasComponent } from "./tareas/tareas.component";
import { ContratistasComponent } from "./config-gral/contratistas/contratistas.component";
import { ProveedoresComponent } from "./config-gral/proveedores/proveedores.component";
import { ClientesComponent } from "./config-gral/clientes/clientes.component";
import { MonedasComponent }  from "./config-gral/monedas/monedas.component";
import { PaisesComponent }  from "./config-gral/paises/paises.component";
import { RubrosComponent }  from "./config-gral/rubros/rubros.component";
import { UnidadesMedidasComponent }  from "./config-gral/unidades-medidas/unidades-medidas.component";
import { PlantillaDocumentosComponent } from './config-gral/plantilla-documentos/plantilla-documentos.component';
import { GeneracionDocumentosComponent } from './generacion-documentos/generacion-documentos.component';
import { InvitacionPresupuestoComponent } from './licitacion-presupuestos/invitacion-presupuesto/invitacion-presupuesto.component';
import { ConfeccionPresupuestoComponent } from './licitacion-presupuestos/confeccion-presupuesto/confeccion-presupuesto.component';
import { ControlDocumentosComponent } from './control-documentos/control-documentos.component';
import { ControlCertificadosComponent } from './control-certificados/control-certificados.component';
import { TableroControlComponent } from './tablero-control/tablero-control.component';
import { HistoriaComponent } from './historia/historia.component';
import { SubTareasComponent } from "./areas/sub-tareas/sub-tareas.component";
import { AddSubTareasComponent } from "./areas/sub-tareas/add-sub-tareas/add-sub-tareas.component";
import { DirectorioComponent } from "./directorio/directorio.component";
import { DirectorioProyectoComponent } from './directorio/directorio-proyecto/directorio-proyecto.component';
import { ViewerArchivosComponent } from "./areas/viewer-archivos/viewer-archivos.component";
import { ViewerArchivosDocsComponent } from "./areas/viewer-archivos-docs/viewer-archivos-docs.component";
import { ObraCertComponent } from "./obra-cert/obra-cert.component";

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'usrmgmt',
      component: UsrMgmtComponent,
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
    },
    {
      path: 'proyectos',
      component: ProyectosComponent,
    },
    {
      path: 'detalle-proyecto/:legajo',
      component: DetalleProyectoComponent,
    },
    {
      path: 'areas/:legajo/:area',
      component: AreasComponent,
    },
    {
      path: 'acceso-denegado',
      component: AccesoDenegadoComponent,
    },
    {
      path: 'asignar-area',
      component: AsigAreasComponent,
    },
    {
      path: 'AMtareas/:id',
      component: AmTareasComponent,
    },
    {
      path: 'detalle-usuario/:id',
      component: DetalleUserComponent,
    },
    {
      path: 'misproyectos',
      component: MisProyectosComponent,
    },
    {
      path: 'nav-proyecto/:legajo',
      component: NavProyectoComponent,
    },
    {
      path: 'proyectos-inactivos',
      component: ProyectosIComponent,
    },
    {
      path: 'papelera',
      component: ProyectosDComponent,
    },
    {
      path: 'crear-area/:area',
      component: AMAreasComponent,
    },
    {
      path: 'tareas',
      component: TareasComponent,
    },


    {
      path: '',
      redirectTo: 'iot-dashboard',
      pathMatch: 'full',
    },
    {
      path: 'contratistas',
      component: ContratistasComponent,
    },
    {
      path: 'proveedores',
      component: ProveedoresComponent,
    },
    {
      path: 'clientes',
      component: ClientesComponent,
    },
    {
      path: 'monedas',
      component: MonedasComponent,
    },{
      path: 'paises',
      component: PaisesComponent,
    },{
      path: 'rubros',
      component: RubrosComponent,
    },{
      path: 'unidades-medidas',
      component: UnidadesMedidasComponent,
    },{
      path: 'plantilla-documentos',
      component: PlantillaDocumentosComponent,
    },{
      path: 'generacion-documentos',
      component: GeneracionDocumentosComponent,
    },{
      path: 'invitacion-presupuesto',
      component: InvitacionPresupuestoComponent,
    },{
      path: 'confeccion-presupuesto',
      component: ConfeccionPresupuestoComponent,
    },{
      path: 'control-documentos',
      component: ControlDocumentosComponent,
    },{
      path: 'control-certificados',
      component: ControlCertificadosComponent,
    },{
      path: 'tablero-control',
      component: TableroControlComponent,
    },{
      path: 'historia',
      component: HistoriaComponent,
    },{
      path: 'sub-tareas/:tarea',
      component: SubTareasComponent,
    },{
      path: 'add-sub-tareas/:mon/:leg/:area/:id',
      component: AddSubTareasComponent,
    },{
      path: 'directorio',
      component: DirectorioComponent,
    },{
      path: 'directorio-proyecto/:leg',
      component: DirectorioProyectoComponent,
    },{
      path: 'viewer-archivos/:idarch',
      component: ViewerArchivosComponent,
    },{
      path: 'viewer-documentos/:idarch',
      component: ViewerArchivosDocsComponent,
    },{
      path: 'obracert/:legajoProy/:nCert',
      component: ObraCertComponent,
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },{
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

