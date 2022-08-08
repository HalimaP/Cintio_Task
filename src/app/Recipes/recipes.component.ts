import { HttpClient } from "@angular/common/http";
import { isNgTemplate } from "@angular/compiler";
import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  EventEmitter,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { debounceTime, distinctUntilChanged, map, tap } from "rxjs/operators";
import { filter, fromEvent, Subscription } from "rxjs";
import { RecipeService } from "src/app/Services/recipe.service";

@Component({
  selector: "app-recipes",
  templateUrl: "./recipes.component.html",
  styleUrls: ["./recipes.component.css"],
})
export class RecipesComponent implements OnInit {
  segment = [false, false];
  segment_value: string = "people";
  searchText: string = "";
type : string = '';
  isData: any = [];
  recipesSub: Subscription | undefined;
  recipesByTypeSub: Subscription | undefined;
  recipesByType: any;
  id: number =0
  recipes: any = [];
  isChecked = false;
  selectedAsFavorite: number = 0;
  localRecipes: any[] = [];
  isFavorite: boolean[] = [];
  favoriteRecipes: Object[] = [];
  constructor(
    private recipesService: RecipeService,
    private httpClient: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.recipesSub = this.recipesService.getRecipes().subscribe((data) => {
      this.localRecipes = data.recipes;
      console.log(this.localRecipes)
   
    });
    this.recipesByTypeSub = this.recipesService
    .fetchMoreRecipes('bread')
    .subscribe((data) => {
      this.recipesByType = data;
      console.log("drugi", data);
      
    
    });
  }

  ngOnDestroy() {
    if (this.recipesSub) {
      this.recipesSub.unsubscribe();
    }
    if (this.recipesByTypeSub) {
      this.recipesByTypeSub.unsubscribe();
    }
  }
  getId(id: number){
this.recipesService.fetchId(id).subscribe((data: number)=>{
this.id = data

})
  }
  onSearchTextEntered(searchValue: string) {
    if (searchValue.length > 2) {
      this.searchText = searchValue;
      console.log(this.searchText );
    }
    if(searchValue.length <= 2){
      this.searchText = ''
    }
  }
  segmentChanged(type: string) {
    switch (type) {
      case "bread":
        this.recipesByTypeSub = this.recipesService
          .fetchMoreRecipes(type)
          .subscribe((data) => {
            this.recipesByType = data;
            console.log("prvi", data);
            console.log(type);
            this.segment = [true, false];
            this.type = type;
          });
        break;
      case "sauce":
        this.recipesByTypeSub = this.recipesService
          .fetchMoreRecipes(type)
          .subscribe((data) => {
            this.recipesByType = data;
            console.log("drugi", data);
            console.log(type);

            this.segment = [false, true];
            this.type = type;
          });
        break;
    }
  }
  onItemClick(id: any) {
    for (let i = 0; i < this.localRecipes.length; i++) {
      // console.log(this.localRecipes.results[i].id)
      if (this.localRecipes[i].id == id) {
        this.isFavorite[id] = !this.isFavorite[id];
        this.favoriteRecipes.push(this.localRecipes[i]);
        this.selectedAsFavorite = this.favoriteRecipes.length;
      }
    }
   
    if (this.recipesByType.length > 0) {
      for (let i = 0; i < this.recipesByType.length; i++) {
        if (this.recipesByType[i].id == id) {
          this.isFavorite[id] = !this.isFavorite[id];
          this.favoriteRecipes.push(this.recipesByType[i]);
          this.selectedAsFavorite = this.favoriteRecipes.length;
        }
      }
    }
    //  this.isFavorite = !this.isFavorite
  }

  addFavoritesOnTheTop() {
    this.isChecked = !this.isChecked;
    if (this.isChecked == true) {
      this.localRecipes.filter((localItem: any) => {
        this.favoriteRecipes.filter((favoriteItem: any) => {
          if (localItem === favoriteItem) {
            this.localRecipes = [favoriteItem, ...this.localRecipes];
            this.localRecipes = [...new Set(this.localRecipes)];
          }
        });
      });
    }
    
    if (this.isChecked == true) {
     
        this.recipesByType.filter((localItem: any) => {
          this.favoriteRecipes.filter((favoriteItem: any) => {
            if (localItem === favoriteItem) {
              this.recipesByType = [favoriteItem, ...this.recipesByType];
              this.recipesByType = [...new Set(this.recipesByType)];
            }
          });
        });
      
    }

   
  }

  onReadMoreClick(id: number) {
    this.router.navigate(["home", "read-more", id], {
      // state: this.localRecipes[index].id,
    });
  }
}
