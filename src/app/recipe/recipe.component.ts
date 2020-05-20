import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';
import {
  ActivatedRoute,
  Params,
  Router,
  NavigationStart,
} from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  showBanner: boolean = false;
  showurl: string;
  // selectedRecipe: Recipe;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    // this.activatedRoute.params.subscribe((params) => {
    //  console.log(params.id);
    //  console.log(this.activatedRoute.url);
    // });
  }

  ngOnInit() {
    // this.recipeService.recipeSelected
    // .subscribe((recipe: Recipe) => {
    //   this.selectedRecipe = recipe;
    // });

    this.router.events.subscribe((event) => {
      
      if (event instanceof NavigationStart) {
        let url: string = event.url;
        console.log(event.url);
        
        if (url === '/recipes') {
          this.showBanner = true;
        } else {
          this.showBanner = false;
        }
      }
    });
  }
}
