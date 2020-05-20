import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredients.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput', { static: false }) nameInputRef: ElementRef;
  // @ViewChild('amountInput', { static: false }) amountInputRef: ElementRef;
  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode: boolean = false;
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.slService.startEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name:this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    );
  }

  // onAddItem() {
  //   const ingName = this.nameInputRef.nativeElement.value;
  //   const ingAmount = this.amountInputRef.nativeElement.value;
  //   const newIngredientAdded = new Ingredient(ingName, ingAmount);
  //   // this.ingredientAdded.emit(newIngredientAdded);
  //   this.slService.addIngredient(newIngredientAdded);
  // }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.slService.updateIngredient(this.editItemIndex, newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }

    this.onClear();
  }

  onDelete() {
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
