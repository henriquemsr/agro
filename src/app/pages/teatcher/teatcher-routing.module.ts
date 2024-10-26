import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeatcherComponent } from './teatcher.component';

const routes: Routes = [
  { path: '', component: TeatcherComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeatcherRoutingModule { }
