import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RecipeService } from "src/app/Services/recipe.service";
import { DomSanitizer } from "@angular/platform-browser";
@Component({
  selector: "app-read-more",
  templateUrl: "./read-more.component.html",
  styleUrls: ["./read-more.component.css"],
})
export class ReadMoreComponent implements OnInit {
  recipesSub : Subscription | undefined
  articleIndex: number = 0;
  articleData: any = [];
  title: string = "";
  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    protected sanitizer: DomSanitizer
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
     this.articleData.summary = this.sanitizer.bypassSecurityTrustHtml(data.summary);
    });
    
  
  }
  ngOnDestroy(){
    if(this.recipesSub){
      this.recipesSub.unsubscribe();
    }
  }
  
}
