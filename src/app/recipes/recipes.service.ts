import { EventEmitter, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shopping-list/ingredient';
import { ShoppingListService } from '../shopping-list/services/shopping-list.service';
import { Recipe } from './recipes';
import * as ShoppingListActions from './../shopping-list/store/shopping-list.actions';
import * as fromApp from './../store/app.reducer';

@Injectable()
export class RecipesService {

  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  // setRecipes(recipes: Recipe[]) {
  //   this.recipes = recipes;
  //   this.recipeChanged.next(this.recipes.slice());
  // }

  // getRecipes(): Recipe[] {
  //   return this.recipes.slice();
  // }

  // getRecipe(idx: number): Recipe {
  //   return this.recipes[idx];
  // }

  // addIngredientToShoppingList(ingredients: Ingredient[]) {
  //   this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  //   // this.slService.addIngredients(ingredients);
  // }

  // updateRecipe(idx: number, recipe: Recipe) {
  //   this.recipes[idx] = recipe;
  // }

  // addRecipe(recipe: Recipe) {
  //   this.recipes.push(recipe);
  //   this.recipeChanged.next(this.recipes.slice())
  // }

  // deleteRecipe(idx: number) {
  //   this.recipes.splice(idx, 1);
  //   this.recipeChanged.next(this.recipes.slice());
  // }
}
