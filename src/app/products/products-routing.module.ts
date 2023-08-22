import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductAddPageComponent } from './pages/product-add-page/product-add-page.component';
import { ProductEditPageComponent } from './pages/product-edit-page/product-edit-page.component';

const routes: Routes = [
  {
    path: '',
    component: ProductListPageComponent
  },
  {
    path: 'add',
    component: ProductAddPageComponent
  },
  {
    path: 'edit/:id',
    component: ProductEditPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
