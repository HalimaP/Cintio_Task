import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipesComponent } from './Recipes/recipes.component';
import { Pipe, PipeTransform } from '@angular/core';
import { SearchComponent } from './search/search.component';
import { CommonModule } from '@angular/common';
import { ReadMoreComponent } from './Recipes/read-more/read-more.component';


@NgModule({
  declarations: [
    AppComponent,
    RecipesComponent,
    SearchComponent,
    ReadMoreComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule
   
    
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
