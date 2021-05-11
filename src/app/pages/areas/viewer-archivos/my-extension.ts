import { Extension } from 'ng2-adsk-forge-viewer';

declare const THREE: any;

export class MyExtension extends Extension {
  // Nombre de la extension (es obligatorio)
  public static extensionName: string = 'MyExtension';

  // prueba de barra de herramientas
  private subToolbar: Autodesk.Viewing.UI.ToolBar;
  private onToolbarCreatedBinded: any;
 
  public load() {
    // Se llama cuando queress cargar el viewer
    console.log('MyExtension loaded!');

    this.viewer.addEventListener(Autodesk.Viewing.SELECTION_CHANGED_EVENT, (e) => {
      if (e.dbIdArray.length) {
        const dbId = e.dbIdArray[0];
        this.viewer.setThemingColor(dbId, new THREE.Vector4(0, 1, 1,1));
      }
    });

    // Initialise a toolbar
    if (this.viewer.toolbar) {
      // la barra de Herramientas esta creada , ahora creamos la UI
      this.createUI();
    } else {
      // la barra de herramientas todavia no esta creada con esto esperamos a que este lista y la cargamos
      this.onToolbarCreatedBinded = this.onToolbarCreated.bind(this);
      this.viewer.addEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    }

    //  tiene que devolver si o si true o la funcion falla en hacer el load del viewer
    return true;
  }
 
  public unload() {
    if (this.subToolbar) {
      this.viewer.toolbar.removeControl(this.subToolbar);
      this.subToolbar = null;
    }

    // se llama cuando haces un unload del viewer
    console.log('MyExtension unloaded.');
    // tiene que devolver si o si true o la funcion falla en hacer el unload del viewer
    return true;
  }

  public onToolbarCreated() {
    this.viewer.removeEventListener(Autodesk.Viewing.TOOLBAR_CREATED_EVENT, this.onToolbarCreatedBinded);
    this.onToolbarCreatedBinded = null;
    this.createUI();
  }

  private createUI() {
    // Boton 1
    const button1 = new Autodesk.Viewing.UI.Button('my-view-front-button');
    button1.onClick = e => this.setViewCube('front');
    button1.addClass('my-view-front-button');
    button1.setToolTip('View front');

    // boton 2
    const button2 = new Autodesk.Viewing.UI.Button('my-view-back-button');
    button2.onClick = e => this.setViewCube('back');
    button2.addClass('my-view-back-button');
    button2.setToolTip('View Back');

    // SubBarraDeTareas
    this.subToolbar = new Autodesk.Viewing.UI.ControlGroup('my-custom-view-toolbar');
    this.subToolbar.addControl(button1);
    this.subToolbar.addControl(button2);

    this.viewer.toolbar.addControl(this.subToolbar);
  }

  private setViewCube(orientation: 'front'|'back') {
    const ext = (this.viewer.getExtension('Autodesk.ViewCubeUi') as any);
    ext.setViewCube(orientation);
  }
}