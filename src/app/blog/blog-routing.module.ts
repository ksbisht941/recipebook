import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogFullPageComponent } from './blog-full-page/blog-full-page.component';
import { BlogComponent } from './blog.component';

const routes: Routes = [
  {path: '', component: BlogComponent},
  {path: ':title', component: BlogFullPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
