import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from "@angular/material/paginator";
import {ThemeModule } from "../../../@theme/theme.module"
import { TimerService } from ".//timer.service";
import { NbEvaIconsModule } from "@nebular/eva-icons";



//todos los modulos a agregar o quitar son heredados desde dashboard module

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    MatPaginatorModule,
    NbEvaIconsModule,

    
 
  ],
  declarations:
  [

  ],
  exports: 
  [

  ]
})
export class TimerModule { 

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TimerModule,
      providers: [TimerService]
    }
  }
  }
