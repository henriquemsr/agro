import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassmatesRoutingModule } from './classmates-routing.module';
import { ClassmatesComponent } from './classmates.component';
import { MaterializeInputModule } from 'materialize-angular';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalModule } from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [ClassmatesComponent, FormComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterializeInputModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    ClassmatesRoutingModule
  ]
})
export class ClassmatesModule { }
