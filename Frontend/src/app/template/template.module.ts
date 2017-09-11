import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from "@angular/router";
import {
  GrowlModule,
} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {TemplateComponent} from "./template.component";
import {MyBreadcrumbModule} from "../components/my-breadcrumb/my-breadcrumb";


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    CommonModule,
    ReactiveFormsModule,

    GrowlModule,

    MyBreadcrumbModule,
    RouterModule.forChild([
      { path:'',component:TemplateComponent}
    ])
  ],
  declarations: [TemplateComponent],
  exports:[RouterModule]
})
export class TemplateModule { }
