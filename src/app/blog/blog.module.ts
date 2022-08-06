import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';
import { BlogFullPageComponent } from './blog-full-page/blog-full-page.component';


@NgModule({
  declarations: [
    BlogComponent,
    BlogFullPageComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
