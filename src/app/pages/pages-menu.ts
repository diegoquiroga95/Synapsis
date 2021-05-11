import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
    home: true,
  },  
  {
    title: 'Configuracion General',
    icon:"settings-2-outline",
    children:[
      {
        title: 'Contratistas',
        icon: 'bookmark-outline',
        link:'/pages/contratistas',
      },{
        title: 'Proveedores',
        icon: 'car-outline',
        link:'/pages/proveedores',
      },{
        title: 'Clientes',
        icon: 'people-outline',
        link:'/pages/clientes',
      },{
        title: 'Monedas',
        icon: 'radio-button-on-outline',
        link:'/pages/monedas',
      },{
        title: 'Paises',
        icon: 'globe-2-outline',
        link:'/pages/paises',
      },{
        title: 'Rubros',
        icon: 'book-outline',
        link:'/pages/rubros',
      },{
        title: 'Unidades de Medida',
        icon: 'thermometer-outline',
        link:'/pages/unidades-medidas',
      },{
        title: 'Plantilla de Documentos',
        icon: 'clipboard-outline',
        link:'/pages/plantilla-documentos',
      },{
        title: 'Gestión de Usuarios ',
        icon: 'person-add-outline',
        link: '/pages/usrmgmt',
      }
    ]
  },
  {
    title: 'Licitacion/Presupuesto',
    icon: 'home-outline',
    children:[
      {
        title:"Invitación a presupuestar",
        icon:'email-outline',
        link: 'invitacion-presupuesto',

      },{
        title:"Armado de Presupuestos",
        icon:'edit-2-outline',
        link: 'confeccion-presupuesto',
      },{
        title:"Directorio de proyectos",
        icon:'edit-2-outline',
        link: 'directorio',
      }
    ]
  },{
    title: 'Generacion de Documentos',
    icon: 'attach-2-outline',
    link: 'generacion-documentos',

  },
  {
    title: 'Control de Documentos',
    icon: 'book-open-outline',
    link: 'control-documentos',
  },
  {
    title: 'Control de proyectos',
    icon: 'clipboard-outline',
    children: [
      {
        title: 'Proyectos Activos',
        icon:'flash-outline',
        link: '/pages/proyectos',
      },
      {
        title: 'Proyectos Inactivos',
        icon:'flash-off-outline',
        link: '/pages/proyectos-inactivos',
      },
      {
        title: 'Papelera de Proyectos',
        icon:'trash-2-outline',
        link: '/pages/papelera',
      },{
        title: 'Mis Proyectos',
        icon: 'list-outline',
        link: '/pages/misproyectos',
      }
    ]
  },{
    title: 'Control de Certificados',
    icon: 'checkmark-circle-outline',
    link: '/pages/control-certificados',
  },{
    title: 'Tablero de Control',
    icon: 'pie-chart-outline',
    link: '/pages/tablero-control',
  },{
    title: 'Historia',
    icon: 'archive-outline',
    link: '/pages/historia',
  }  
];
