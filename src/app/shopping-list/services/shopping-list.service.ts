import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../ingredient';

// @Injectable({
//   providedIn: 'root'
// })
export class ShoppingListService {

  // ingChanged = new Subject<Ingredient[]>();
  // startedEditing = new Subject<number>();

  // private ingredients: Ingredient[] = [];

  constructor() { }

  // getIngredients(): Ingredient[] {
  //   return this.ingredients.slice();
  // }

  // getIngredient(idx: number): Ingredient {
  //   return this.ingredients[idx];
  // }

  // addIngredient(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //   this.ingChanged.next(this.ingredients.slice());
  // }

  // addIngredients(ingredient: Ingredient[]) {
  //   this.ingredients.push(...ingredient);
  //   this.ingChanged.next(this.ingredients.slice());
  // }
  
  // updateIngredient(idx: number, ingredient: Ingredient) {
  //   this.ingredients[idx] = ingredient;
  //   this.ingChanged.next(this.ingredients.slice());
  // }
  
  // deleteIngredient(idx: number) {
  //   this.ingredients.splice(idx, 1);
  //   this.ingChanged.next(this.ingredients.slice());
  // }
}
