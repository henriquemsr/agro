import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeatcherRoutingModule } from './teatcher-routing.module';
import { TeatcherComponent } from './teatcher.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [TeatcherComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    TeatcherRoutingModule
  ]
})
export class TeatcherModule { }
