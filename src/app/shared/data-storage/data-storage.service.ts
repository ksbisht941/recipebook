// import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Store } from '@ngrx/store';
// import { exhaustMap, map, take, tap } from 'rxjs';
// import { AuthService } from 'src/app/auth/auth.service';
// import { User } from 'src/app/auth/user';
// import { Recipe } from 'src/app/recipes/recipes';
// import { RecipesService } from 'src/app/recipes/recipes.service';
// import * as fromApp from './../../store/app.reducer';
// import * as RecipesActions from './../../recipes/store/recipe.actions';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    // private httpClient: HttpClient,
    // private authService: AuthService,
    // private recipeService: RecipesService,
    // private store: Store<fromApp.AppState>
  ) { }

  // storeRecipes() {
  //   const recipes = this.recipeService.getRecipes();
  //   console.log(recipes);
    
  //   if (!recipes || !recipes.length) return false;

  //   return this.httpClient.put('https://angularguidebook.firebaseio.com/recipes.json', recipes).subscribe();
  // }

  // fetchRecipes() {
  //   return this.httpClient.get<Recipe[]>('https://angularguidebook.firebaseio.com/recipes.json').pipe(
  //     map(recipes => {
  //       return recipes.map((recipe) => {
  //         return { 
  //           ...recipe,
  //           ingredients: recipe.ingredients ? recipe.ingredients : []
  //         }
  //       })
  //     }),
  //     tap(recipes => {
  //       this
  //       // this.recipeService.setRecipes(recipes);
  //       this.store.dispatch(new RecipesActions.SetRecipes(recipes));
  //     }));
  // }
}
