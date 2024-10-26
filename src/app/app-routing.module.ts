import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren:
      () => import('./login/login.module').then(v => v.LoginModule)
  },
  {
    path: "main",
    loadChildren:
      () => import('./main/main.module').then(v => v.MainModule)
  },
  {
    path: "administration",
    loadChildren:
      () => import('./pages/administration/administration.module').then(v => v.AdministrationModule)
  },
  {
    path: "classmates",
    loadChildren:
      () => import('./pages/classmates/classmates.module').then(v => v.ClassmatesModule)
  },
  {
    path: "materials",
    loadChildren:
      () => import('./pages/materials/materials.module').then(v => v.MaterialsModule)
  },
  {
    path: "registration",
    loadChildren:
      () => import('./pages/registration/registration.module').then(v => v.RegistrationModule)
  },
  {
    path: "teacher",
    loadChildren:
      () => import('./pages/teatcher/teatcher.module').then(v => v.TeatcherModule)
  },
  {
    path: "schedule",
    loadChildren:
      () => import('./pages/schedule/schedule.module').then(v => v.ScheduleModule)
  },
  {
    path:"/agro",
    loadChildren: 
    () => import('./pages/project-agro/project-agro.module').then(m => m.ProjectAgroModule)
  }
  // {
  //   path:"agro",
  //   loadChildren: () => import('./pages/agro/agro-routing.module').then(m => m.AgroModule)
  // }
  // {
  //   loadChildren:
  //   path:"agro",
  //   ()=> import('./pages/agro/agro-routing.module').then(v=> v.)
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
