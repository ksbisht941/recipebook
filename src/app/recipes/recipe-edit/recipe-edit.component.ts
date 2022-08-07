import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shopping-list/ingredient';
// import { Recipe } from '../recipes';
// import { RecipesService } from '../recipes.service';
import * as fromApp from './../../store/app.reducer';
import * as RecipesActions from './../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;

  storeSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    // private recipeService: RecipesService,
    private store: Store<fromApp.AppState>
  ) {
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      
      this.id = +params['id'];
      console.log(this.id);
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  ngOnDestroy(): void {
      if (this.storeSub) this.storeSub.unsubscribe();
  }
  
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      // const recipe = this.recipeService.getRecipe(this.id);
      this.storeSub = this.store
        .select('recipes')
        .pipe(
          map(recipeState => recipeState.recipes.find((recipe, index) => index == this.id))
        )
        .subscribe(recipe => {
          recipeName = recipe.name;
          recipeImagePath = recipe.imagePath;
          recipeDescription = recipe.description;
          if (recipe['ingredients']) {
            for (let ingredient of recipe.ingredients) {
              recipeIngredients.push(
                new FormGroup({
                  name: new FormControl(ingredient.name, Validators.required),
                  amount: new FormControl(ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
                })
              );
            }
          }
        });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  createRecipeForm(): FormGroup {
    return this.formBuilder.group({
      name: [null, []],
      description: [null, []],
      imagePath: [null, []],
      ingredients: this.formBuilder.array([this.createIngredientForm()])
    })
  }

  createIngredientForm(ingredient?: Ingredient): FormGroup {
    return this.formBuilder.group({
      name: [ingredient?.name, [Validators.required]],
      amount: [ingredient?.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]]
    })
  }

  get ingredients(): FormArray {
    return <FormArray>this.recipeForm.get('ingredients');
  }

  onAddIngredient() {
    this.ingredients.push(this.createIngredientForm());
  }

  onDeleteIngredient(idx: number) {
    this.ingredients.removeAt(idx);
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.get('name')?.value,
    //   this.recipeForm.get('description')?.value,
    //   this.recipeForm.get('imagePath')?.value,
    //   this.recipeForm.get('ingredients')?.value
    // );

    // console.log(this.recipeForm.value);
    

    if (this.editMode) {
      // this.recipeService.updateRecipe(this.id, newRecipe);
      this.store.dispatch(new RecipesActions.UpdateRecipe({idx: this.id, newRecipe: this.recipeForm.value}));
    } else {
      // this.recipeService.addRecipe(newRecipe);
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value));
    }

  }
 
  onCancel() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }
}
