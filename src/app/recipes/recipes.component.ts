import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscriber, Subscription } from 'rxjs';
import { Recipe } from './recipes';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  providers: []
})
export class RecipesComponent implements OnInit, OnDestroy {

  selectedRecipe!: Recipe;
  private recipeSub!: Subscription;

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }
}
