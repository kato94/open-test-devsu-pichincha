import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListPageComponent } from './pages/product-list-page/product-list-page.component';
import { ProductAddPageComponent } from './pages/product-add-page/product-add-page.component';
import { ProductEditPageComponent } from './pages/product-edit-page/product-edit-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductListPageComponent,
    ProductAddPageComponent,
    ProductEditPageComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedModule,
  ]
})
export class ProductsModule { }
