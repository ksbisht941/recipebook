import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeComponent } from './recipe.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { ShoppingListModule } from '../shopping-list/shopping-list.module';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RecipeResolverService } from './recipe-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: RecipeComponent,
    resolve: [RecipeResolverService],
    children: [
      {
        path: 'new',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
];

@NgModule({
  declarations: [
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  exports: [
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
})
export class RecipeModule {}
