/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { APP_BASE_HREF } from '@angular/common';//
import { BrowserModule } from '@angular/platform-browser';//
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//
import { NgModule } from '@angular/core';//
import { HttpClientModule } from '@angular/common/http';//
import { CoreModule } from './@core/core.module';//
import { NbPasswordAuthStrategy, NbAuthModule } from '@nebular/auth';//
import { AppComponent } from './app.component';//
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { AuthGuard } from './auth-guard.service';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbCardModule
} from '@nebular/theme';
import { OWL_DATE_TIME_LOCALE } from 'ng-pick-datetime';
import { TimerModule } from "../app/pages/dashboard/timer/timer.module";
import { LoginComponent } from "./pages/login/login.component";

@NgModule({
  declarations: [AppComponent,LoginComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    TimerModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    DropDownsModule,
    DialogsModule,
    ThemeModule.forRoot(),
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',

          baseEndpoint: 'http://localhost/Sinapsis/SinapsisApi/login',//'http://192.168.1.252/SinapsisApi/endpoints/login',
           login: {
             endpoint:'/cred.php',//'/login.php',
             redirect: {
              success: '/pages',
              failure: null,
            },
           },
        }),
      ],
      forms: {},
    })
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    AuthGuard,
    {provide: OWL_DATE_TIME_LOCALE, useValue: 'es-AR'}
  ],
})
export class AppModule {
}
