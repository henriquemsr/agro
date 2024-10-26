import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ComponentsModule } from '../components/components.module';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    DragDropModule,
    MainRoutingModule
  ]
})
export class MainModule { }
