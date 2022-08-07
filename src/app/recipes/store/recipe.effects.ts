import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, tap, withLatestFrom } from "rxjs";
import { Recipe } from "../recipes";
import * as RecipesActions from './recipe.actions';
import * as fromApp from './../../store/app.reducer';
import { Store } from "@ngrx/store";

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.httpClient.get<Recipe[]>('https://angularguidebook.firebaseio.com/recipes.json')
        }),
        map(recipes => {
            return recipes.map((recipe) => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                }
            })
        }),
        map(recipes => {
            // this.recipeService.setRecipes(recipes);
            // this.store.dispatch(new RecipesActions.SetRecipes(recipes));
            return new RecipesActions.SetRecipes(recipes)
        })
    );

    @Effect({dispatch: false})
    storeRecipe = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap(([actionData, recipesState]) => {
            return this.httpClient.put('https://angularguidebook.firebaseio.com/recipes.json', recipesState.recipes);
        })
    )

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<fromApp.AppState>
    ) { }
}