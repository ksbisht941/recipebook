import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/loader/loader.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];
  // @Output() recipeWasSelected = new EventEmitter<Recipe>();

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
  ) {
    this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
    this.recipes = this.recipeService.getRecipes();
    this.loaderService.showPreloader(false);
  }

  ngOnInit(): void {}

  // onRecipeSelected(recipe: Recipe) {
  //   this.recipeWasSelected.emit(recipe);
  //   console.log(recipe);
  // }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.activatedRoute });
  }
}
