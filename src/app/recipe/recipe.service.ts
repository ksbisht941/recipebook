import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredients.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // recipeSelected = new Subject<Recipe>();
  // recipeSelected = new EventEmitter<Recipe>();
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('A Test Recipe 1', 'Test Recipe Description 1', 'recipe-1', [
  //     new Ingredient('Ingredient1', 10),
  //     new Ingredient('Ingredient2', 20),
  //     new Ingredient('Ingredient3', 30),
  //   ]),
  //   new Recipe('A Test Recipe 2', 'Test Recipe Description 2', 'recipe-2', [
  //     new Ingredient('Ingredient1', 10),
  //     new Ingredient('Ingredient2', 20),
  //     new Ingredient('Ingredient3', 30),
  //   ]),
  //   new Recipe('A Test Recipe 3', 'Test Recipe Description 3', 'recipe-3', [
  //     new Ingredient('Ingredient1', 10),
  //     new Ingredient('Ingredient2', 20),
  //     new Ingredient('Ingredient3', 30),
  //   ])
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }
  
  getRecipe(index: number) {
    return this.recipes[index];
  }
  
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
