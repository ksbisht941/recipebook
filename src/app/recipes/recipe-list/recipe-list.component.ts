import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ComponentFactoryResolver, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Subscriber, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder/placeholder.directive';
import { Recipe } from '../recipes';
// import { RecipesService } from '../recipes.service';
import * as fromApp from './../../store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
 
  recipes: Recipe[];
  error!: string | null;

  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;
  closeSub!: Subscription;
  recipeChangedSub!: Subscription;

  constructor(
    // private recipesService: RecipesService,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { 
    // this.recipes = this.recipesService.getRecipes();

    this.recipeChangedSub = this.store.select('recipes').pipe(
      map(recipeState => recipeState.recipes)
    ).subscribe((recipe: Recipe[]) => this.recipes = recipe);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.closeSub instanceof Subscriber) this.closeSub.unsubscribe();
    if (this.recipeChangedSub instanceof Subscriber) this.recipeChangedSub.unsubscribe();
  }

  recipeTrackBy(idx: number) {
    return idx;
  }

  onNewRecipe() {
    this.router.navigate(['/recipe', 'new']);
  }

  showErrorAlert(error: string) {
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContaineref = this.alertHost.viewContainerRef;
    hostViewContaineref.clear();
    
    const componentRef = hostViewContaineref.createComponent(alertCmpFactory);
    componentRef.instance.message = error;
    this.closeSub = componentRef.instance.close.subscribe((res: any) => {
      // this.closeSub.unsubscribe() ;     
      hostViewContaineref.clear();
    })
  }
}
