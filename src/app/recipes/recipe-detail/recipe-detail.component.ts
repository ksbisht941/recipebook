import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, switchMap } from 'rxjs';
import { Ingredient } from 'src/app/shopping-list/ingredient';
import { Recipe } from '../recipes';
import { RecipesService } from '../recipes.service';
import * as fromApp from './../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe;
  id!: number;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) { 
    this.route.params.pipe(
      map(params => +params['id']),
      switchMap(id => {
        this.id = id;
        return this.store.select('recipes')
      }),
     map(recipesState => recipesState.recipes.find((recipe, idx) => idx === this.id))
    ).subscribe(recipe => this.recipe = recipe);
  }

  ngOnInit(): void {
  }

  ingredientTrackBy(idx: number) {
    return idx;
  }

  onAddToshoppingList(ingredients: Ingredient[]) {
    this.recipeService.addIngredientToShoppingList(ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['/recipe', this.id, 'edit']);
  }
  
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipe']);
  }
}
