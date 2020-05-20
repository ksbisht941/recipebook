import { Ingredient } from '../../shared/ingredients.model';
import { Action } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.actions';

const initialState = {
  ingredients: [new Ingredient('Apples', 30), new Ingredient('Tomatoes', 20)],
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.AddIngredient) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      //   state.ingredients.push();
      return { ...state, ingredients: [...state.ingredients, action.payload] };

    default:
      break;
  }
}
