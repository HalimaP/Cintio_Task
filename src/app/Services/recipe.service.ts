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
  public $id = new BehaviorSubject<number>(0)
  constructor(private httpClient: HttpClient) {}

  public getRecipes(number:number = 10) {
    return this.httpClient
      .get(
        `${environment.mainUrl}/random?type=bread&apiKey=${environment.apiKey}&number=${number}`
      )
      .pipe(
        take(1),

        map((data: any) => {
          this.$recipes.next(data.results);
          return data;
        })
      );
  }
  fetchMoreRecipes(type: string = 'bread', number: number = 10) {
    return this.httpClient
      .get(
        `${environment.mainUrl}/complexSearch?apiKey=${environment.apiKey}&number=${number}&type=${type}`
      )
      .pipe(
        take(1),
        map((data: any) => {
          this.$recipesByType.next(data.results);
          return data;
        })
      );
  }
  fetchId(id: number){
    return this.httpClient
    .get(
      `${environment.mainUrl}/${id}/information?apiKey=${environment.apiKey}`
    )
    .pipe(
      take(1),
      map((data: any) => {
        this.$id.next(data);
        return data;
      })
    );
  }
}
