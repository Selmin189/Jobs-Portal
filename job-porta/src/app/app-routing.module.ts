import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {JobsComponent} from "./main/job/jobs/jobs.component";
import {JobReactiveFormComponent} from "./main/job/job-reactive-form/job-reactive-form.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canLoad: [AuthGuard]
  }
  ]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
