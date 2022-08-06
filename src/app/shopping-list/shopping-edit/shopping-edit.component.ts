import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from '../ingredient';
import { ShoppingListService } from '../services/shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('ngForm') ngForm!: NgForm;

  private startedEditingSub!: Subscription;
  editedItemIdx!: number;
  editMode!: boolean;
  editedItem!: Ingredient;

  constructor(
    private slService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    // this.startedEditingSub = this.slService.startedEditing.subscribe((idx: number) => {

    // this.editedItemIdx = idx;
    // this.editMode = true;
    // this.editedItem = this.slService.getIngredient(this.editedItemIdx);

    // console.log(this.editedItem);


    // this.ngForm.setValue({
    //   name: this.editedItem.name,
    //   amount: this.editedItem.amount,
    // })
    // })

    this.startedEditingSub = this.store.select('shoppingList').subscribe((stateData) => {
      if (stateData.editedIngredientIndex > -1) {

        this.editedItemIdx = stateData.editedIngredientIndex;
        this.editMode = true;
        this.editedItem = stateData.editedIngredient;

        console.log(this.editedItem);


        this.ngForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      } else {
        this.editMode = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.startedEditingSub.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    this.editMode ?
      // this.slService.updateIngredient(this.editedItemIdx, newIngredient) : 
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient)) :
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));

    this.onClearForm();
  }

  onDeleteIngredient() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient())
    // this.slService.deleteIngredient(this.editedItemIdx);
    this.onClearForm();
  }

  onClearForm() {
    this.editMode = false;
    this.ngForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
