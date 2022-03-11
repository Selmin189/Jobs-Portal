import {NgModule} from "@angular/core";
import {JobItemComponent} from "./job/job-item/job-item.component";
import {JobReactiveFormComponent} from "./job/job-reactive-form/job-reactive-form.component";
import {JobsComponent} from "./job/jobs/jobs.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MainRoutingModule} from "./main-routing-module";
import {MainComponent} from "./main.component";

@NgModule({
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    JobItemComponent,
    JobReactiveFormComponent,
    JobsComponent]
})
export class MainModule{

}
