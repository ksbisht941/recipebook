import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { Ingredient } from 'src/app/shopping-list/ingredient';
import { Recipe } from '../recipes';
import { RecipesService } from '../recipes.service';
import * as fromApp from './../../store/app.reducer';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {

  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private recipeService: RecipesService,
    private store: Store<fromApp.AppState>
  ) {
  }
  
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null;
      this.initateForm();
    });
  }
  
  initateForm() {
    let recipe: Recipe;
    let recipeIngredient = this.formBuilder.array([]);

    if (this.editMode) {
      // recipe = this.recipeService.getRecipe(this.id);

      this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, idx) => {
          return idx === this.id
        })
      })).subscribe(recipe => recipe = recipe);

      if (recipe.ingredients && recipe.ingredients.length) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredient.push(this.createIngredientForm(ingredient))
        }
      }
    }

    this.recipeForm = this.formBuilder.group({
      name: [recipe.name, [Validators.required]],
      description: [recipe.description, [Validators.required]],
      imagePath: [recipe.imagePath, [Validators.required]],
      ingredients: recipeIngredient
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
    const newRecipe = new Recipe(
      this.recipeForm.get('name')?.value,
      this.recipeForm.get('description')?.value,
      this.recipeForm.get('imagePath')?.value,
      this.recipeForm.get('ingredients')?.value
    );

    console.log(this.recipeForm.value);
    

    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

  }
 
  onCancel() {
    this.router.navigate(['../'], {
      relativeTo: this.route
    });
  }
}
