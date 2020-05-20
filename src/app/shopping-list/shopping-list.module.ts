import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: ShoppingListComponent }];

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  exports: [ShoppingListComponent, ShoppingEditComponent],
})
export class ShoppingListModule {}
