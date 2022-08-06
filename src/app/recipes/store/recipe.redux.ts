import { Recipe } from "../recipes";
import * as RecipesActions from "./recipe.actions";

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes: []
};

export function recipeReducer(state = initialState, action: RecipesActions.RecipesActions) {
    switch (action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...action.payload]
            }

        // case RecipesActions.ADD_RECIPE:
        //     return {
        //         ...state,
        //         recipes: [...state.recipes, action.type]
        //     }

        // case RecipesActions.UPDATE_RECIPE:
        //     const updatedRecipe = {
        //         ...state.recipes[action.payload.idx],
        //         ...action.payload.newRecipe
        //     }

        //     const updatedRecipes = [...state.recipes];
        //     updatedRecipes[action.payload.idx] = updatedRecipe;

        //     return {
        //         ...state,
        //         recipes: updatedRecipes
        //     }

        // case RecipesActions.DELETE_RECIPE:
        //     return {
        //         ...state,
        //         recipes: state.recipes.filter((recipe, idx) => {
        //             return idx !== action.payload
        //         })
        //     }

        default:
            return state;
    }
}