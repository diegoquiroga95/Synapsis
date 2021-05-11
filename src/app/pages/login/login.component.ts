import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NbLoginComponent } from '@nebular/auth';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent extends NbLoginComponent{
 
 

}
