import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-product-add-page',
  templateUrl: './product-add-page.component.html',
  styleUrls: ['./product-add-page.component.sass']
})
export class ProductAddPageComponent {

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  onSubmit(event: Product) {
    this.productsService.createProduct(event).subscribe({
      next: () => {
        this.router.navigate(['/products']);
        this.notificationService.addNotification('Producto creado');
      },
      error: (error) => {
        this.notificationService.addNotification('No se pudo crear el producto');
      }
    });
  }
}
