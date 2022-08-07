import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './Recipes/recipes.component';
import { ReadMoreComponent } from './Recipes/read-more/read-more.component';

const routes: Routes = [
  {path: '', redirectTo: '/home',  pathMatch: 'full'},
  {path: 'home', component: RecipesComponent},
  {path: 'home/read-more/:id', component: ReadMoreComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
