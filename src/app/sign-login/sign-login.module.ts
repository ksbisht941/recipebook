import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignLoginComponent } from './sign-login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: SignLoginComponent }];

@NgModule({
  declarations: [SignLoginComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
  exports: [SignLoginComponent],
})
export class SignLoginModule {}
