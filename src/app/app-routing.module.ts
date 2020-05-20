import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ErrorComponent } from './shared/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./recipe/recipe.module').then((m) => m.RecipeModule),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./shopping-list/shopping-list.module').then(
        (m) => m.ShoppingListModule
      ),
  },
  {
    path: 'auth/:form',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  // {
  //   path: 'authentication/:form',
  //   loadChildren: () => import('./sign-login/sign-login.module').then((m) => m.SignLoginModule),
  // },
  {
    path: 'page-not-found',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: '/page-not-found',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
