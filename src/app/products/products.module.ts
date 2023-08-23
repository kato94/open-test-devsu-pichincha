import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductAddPageComponent } from './pages/product-add-page/product-add-page.component';
import { ProductEditPageComponent } from './pages/product-edit-page/product-edit-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProductFormComponentComponent } from './components/product-form-component/product-form-component.component';
import { ProductTableComponentComponent } from './components/product-table-component/product-table-component.component';


@NgModule({
  declarations: [
    ProductListPageComponent,
    ProductAddPageComponent,
    ProductEditPageComponent,
    ProductFormComponentComponent,
    ProductTableComponentComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class ProductsModule { }
