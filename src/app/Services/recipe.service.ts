import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { take, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class RecipeService {
  public $recipes = new BehaviorSubject<any>(null);
  public $recipesByType = new BehaviorSubject<any>(null);
  constructor(private httpClient: HttpClient) {}

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getRecipes() {
    return this.httpClient
      .get(
        `${environment.mainUrl}/random?type=bread&apiKey=${environment.apiKey}&number=10`
      )
      .pipe(
        take(1),

        map((data: any) => {
          this.$recipes.next(data.results);
          return data;
        })
      );
  }
  fetchMoreRecipes(type: string) {
    return this.httpClient
      .get(
        `${environment.mainUrl}/complexSearch?apiKey=${environment.apiKey}&number=10&type=${type}`
      )
      .pipe(
        take(1),
        map((data: any) => {
          this.$recipesByType.next(data.results);
          return data;
        })
      );
  }
}
