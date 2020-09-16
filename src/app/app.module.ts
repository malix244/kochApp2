import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes} from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FilterSearchComponent } from './filter-search/filter-search.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const defaultRoute: Routes = [
  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'search-per-filter', component: FilterSearchComponent},
  {path: 'search-by-ingredients', component: DashboardComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    RecipeComponent,
    FilterSearchComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    RouterModule.forRoot(defaultRoute),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
