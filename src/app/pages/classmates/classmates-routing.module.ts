import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassmatesComponent } from './classmates.component';

const routes: Routes = [
  {path:'',component:ClassmatesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassmatesRoutingModule { }
