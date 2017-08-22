import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AppComponent } from './app.component';
import { HttpService } from './common/http.service';

import {appRoutes} from './app.routes';
import {Preload} from './preloading';
import {WorkspaceService} from './workspace/workspace.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    HttpModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { preloadingStrategy: Preload }
    ),
  ],
  providers: [
    HttpService,
    WorkspaceService,
    Preload,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
