import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule} from "@angular/router";
import {
  ChartModule
} from 'primeng/primeng';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule, JsonpModule} from "@angular/http";
import {EditorComponent} from "./editor.component";
import { MonacoEditorModule } from 'ngx-monaco-editor';


@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    CommonModule,
    ReactiveFormsModule,

    MonacoEditorModule,
    RouterModule.forChild([
      { path:'',component:EditorComponent}
    ])
  ],
  declarations: [EditorComponent],
  exports:[RouterModule]
})
export class EditorModule { }
