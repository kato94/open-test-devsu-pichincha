import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.sass']
})
export class ProductListPageComponent implements OnInit {

  public products: Product[] = [];
  public filterValue = '';

  constructor(
    private productsService: ProductsService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (products) => this.products = products,
      error: () => this.notificationService.addNotification('No se pudieron obtener los productos')
    });
  }

}
