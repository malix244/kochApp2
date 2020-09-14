import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const defaultRoute: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(defaultRoute),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
