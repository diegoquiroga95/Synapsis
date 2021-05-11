import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { User, UserResponse } from '../../users';
import { UserService } from '../usr-mgmt/user.service';
import { RegisterService } from '../../register.service';
import { TimerService } from './timer/timer.service';
import { DatePipe } from '@angular/common';
interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {
  user: User;
  id_user: any;
  local_user: any;
  tieneTareas: any;
  tareasMensaje: boolean;

  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
    console.log("chau HandlerUnload");
    localStorage.removeItem('auth_app_token');
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {
    let myDate = new Date();
    let date = this.datePipe.transform(myDate, 'yyyy-MM-dd Hh:mm:ss');
    localStorage.removeItem('auth_app_token');
    //ejecutar funcion cuando se cierra navegador , testear
  }

  ngOnInit() {
    let id = JSON.parse(localStorage.getItem("auth_app_token"));
    if (JSON.parse(localStorage.getItem("auth_app_token")) !== null) {
      
      console.log(id.value);

      this.userService.get_1User(id.value).subscribe(
        res => {
          this.user = res,
            this.storeUser(this.user),
            //problema con remover el toke de autorizacion
            localStorage.removeItem('auth_app_token');
        }
      )
    }

    if ( id === null) {
      console.log("null")
      let idloged = this.registerService.getUserLogged();

      this.id_user = idloged.usr.id_user;

   
    } else {
      console.log("notnull")
      this.id_user = id.value;

      console.log(this.id_user);
      
    }

    this.tmrSrv.resumeTarea(this.id_user).subscribe(
      res => {
        this.tieneTareas = res
        console.log(this.tieneTareas + "<-----------res");
        if (this.tieneTareas === 0) {
          console.log("no tenes tareas a resumir");
          this.tareasMensaje = false;

        } else {
          console.log("DEJASTE TAREAS ANDANDO");
          this.tareasMensaje = true;
          console.log(this.tieneTareas);
        }
      }
    );

  }

  private alive = true;

  solarValue: number;
  lightCard: CardSettings = {
    title: 'Light',
    iconClass: 'nb-lightbulb',
    type: 'primary',
  };
  rollerShadesCard: CardSettings = {
    title: 'Roller Shades',
    iconClass: 'nb-roller-shades',
    type: 'success',
  };
  wirelessAudioCard: CardSettings = {
    title: 'Wireless Audio',
    iconClass: 'nb-audio',
    type: 'info',
  };
  coffeeMakerCard: CardSettings = {
    title: 'Coffee Maker',
    iconClass: 'nb-coffee-maker',
    type: 'warning',
  };

  statusCards: string;

  commonStatusCardsSet: CardSettings[] = [
    this.lightCard,
    this.rollerShadesCard,
    this.wirelessAudioCard,
    this.coffeeMakerCard,
  ];

  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
      default: this.commonStatusCardsSet,
      cosmic: this.commonStatusCardsSet,
      corporate: [
        {
          ...this.lightCard,
          type: 'warning',
        },
        {
          ...this.rollerShadesCard,
          type: 'primary',
        },
        {
          ...this.wirelessAudioCard,
          type: 'danger',
        },
        {
          ...this.coffeeMakerCard,
          type: 'info',
        },
      ],
      dark: this.commonStatusCardsSet,
    };

  constructor(private themeService: NbThemeService,
    private solarService: SolarData,
    private userService: UserService,
    private registerService: RegisterService,
    private tmrSrv: TimerService,
    private datePipe: DatePipe) {


    console.log(this.id_user + "<----sub");
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  ngOnDestroy() {
    this.alive = false;
   
  }
  storeUser(user: User) {
    let sesion = new UserResponse(user);
    this.registerService.setUserLogged(sesion);
  }


}
