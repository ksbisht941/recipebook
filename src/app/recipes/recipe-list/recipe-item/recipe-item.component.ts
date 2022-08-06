import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Recipe } from '../../recipes';
import { RecipesService } from '../../recipes.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input('recipe') recipe!: Recipe;
  @Input('idx') idx!: number;

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit(): void {
  }
}
