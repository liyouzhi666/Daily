import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from "@angular/router";
import {
    GrowlModule,
    DataTableModule
} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {CollectionComponent} from "./collection.component";
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
    DataTableModule,

    MyBreadcrumbModule,
    RouterModule.forChild([
      { path:'',component:CollectionComponent}
    ])
  ],
  declarations: [CollectionComponent],
  exports:[RouterModule]
})
export class CollectionModule { }
