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
  newsSub: Subscription | undefined;
  articleIndex: number = 0;
  articleData: any = [];
  title: string = "";
  storedTitle: any;
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
    
    for (let i = 0; i < this.articleData.dishTypes.length; i++){
      console.log(this.articleData.dishTypes[i])
    }
  }
}
