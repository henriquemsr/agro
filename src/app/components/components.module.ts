import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { RouterModule } from '@angular/router';
import { CalendarComponent } from './calendar/calendar.component';



@NgModule({
  declarations: [MenuComponent, TopBarComponent, CalendarComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    MenuComponent,
    CalendarComponent
  ]
})
export class ComponentsModule { }
