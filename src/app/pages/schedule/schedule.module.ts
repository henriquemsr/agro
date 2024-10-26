import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    FormsModule,
    ModalModule.forRoot(),
    ScheduleRoutingModule
  ]
})
export class ScheduleModule { }
