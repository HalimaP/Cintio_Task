import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RecipeService } from "src/app/Services/recipe.service";

@Component({
  selector: "app-read-more",
  templateUrl: "./read-more.component.html",
  styleUrls: ["./read-more.component.css"],
})
export class ReadMoreComponent implements OnInit {
  recipesSub : Subscription | undefined
  newsSub: Subscription | undefined;
  articleIndex: number = 0;
  articleData: any = [];
  title: string = "";
  storedTitle: any;
  types: any = [] 
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.articleData = this.router.getCurrentNavigation()?.extras.state;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.articleIndex = params["id"];
      this.title = params["title"];
    });
    this.recipesSub = this.recipeService.fetchId(this.articleIndex).subscribe((data) => {
      this.articleData = data;
      console.log(this.articleData)
   console.log(data.dishTypes)
   for(let i=0; i <= data.dishTypes.length; i++){
    this.types.push(data.dishTypes[i])
   
   }
   console.log(this.types)
    });
    
  
  }
  
}
