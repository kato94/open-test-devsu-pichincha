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

  public addProductSuccessMessage = 'Producto creado';
  public addProductErrorMessage = 'No se pudo crear el producto';

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  onSubmit(event: Product) {
    this.productsService.createProduct(event).subscribe({
      next: () => {
        this.router.navigate(['/products']);
        this.notificationService.addNotification(this.addProductSuccessMessage);
      },
      error: () => {
        this.notificationService.addNotification(this.addProductErrorMessage);
      }
    });
  }
}
