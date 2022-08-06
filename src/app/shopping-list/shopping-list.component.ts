import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { LoggingService } from '../shared/logging/logging.service';
import { Ingredient } from './ingredient';
import { ShoppingListService } from './services/shopping-list.service';
import * as fromApp from './../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients!: Observable<{ingredients: Ingredient[]}>;
  private ingChangeSub!: Subscription;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>,
    private loggingService: LoggingService,
  ) {
  }
  
  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.slService.getIngredients();
    // this.ingChangeSub = this.slService.ingChanged.subscribe((ings: Ingredient[]) => this.ingredients = ings);

    // this.loggingService.printLog('Hello from shopping list')
  }

  ngOnDestroy(): void {
    // if (this.ingChangeSub instanceof Subscriber) this.ingChangeSub.unsubscribe();
  }

  ingredientTrackBy(idx: number) {
    return idx;
  }

  onEditIngredient(idx: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(idx));
    // this.slService.startedEditing.next(idx);
  }
}
