import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
