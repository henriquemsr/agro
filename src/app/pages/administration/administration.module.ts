import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [AdministrationComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    AdministrationRoutingModule
  ]
})
export class AdministrationModule { }
