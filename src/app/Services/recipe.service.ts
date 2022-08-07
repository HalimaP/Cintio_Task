import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject } from "rxjs";
import { take, switchMap, tap, map, retry, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  json = "../../recipes.json";
  apiKey = "4662a91784454a349a983b0b4ee2e68a";
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
    console.log(this.apiKey);
    return this.httpClient
      .get(
        `https://api.spoonacular.com/recipes/random?type=bread&apiKey=${this.apiKey}&number=10`
      )
      .pipe(
        take(1),

        map((data: any) => {
          console.log(this.apiKey);
          this.$recipes.next(data.results);
          console.log(data);
          return data;
        })
      );
  }
  fetchMoreRecipes(type: string) {
    return this.httpClient
      .get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${this.apiKey}&number=10&type=${type}`
      )
      .pipe(
        take(1),
        map((data: any) => {
          console.log(data);
          this.$recipesByType.next(data.results);
          console.log(data);
          return data;
        })
      );
  }
}
