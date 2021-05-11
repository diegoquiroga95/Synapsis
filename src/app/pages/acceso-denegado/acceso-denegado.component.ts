import { Component} from '@angular/core';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-acceso-denegado',
  templateUrl: './acceso-denegado.component.html',
  styleUrls: ['./acceso-denegado.component.scss']
})
export class AccesoDenegadoComponent{

  constructor(private menuService: NbMenuService) {
  }
  goToHome() {
    this.menuService.navigateHome();
  }
  
}
