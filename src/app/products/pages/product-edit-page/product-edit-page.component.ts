import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-product-edit-page',
  templateUrl: './product-edit-page.component.html',
  styleUrls: ['./product-edit-page.component.sass']
})
export class ProductEditPageComponent implements OnInit {

  public product?: Product;
  public updateProductSuccessMessage = 'Producto actualizado';
  public updateProductErrorMessage = 'No se pudo actualizar el producto';

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.setProduct();
  }

  setProduct() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['data']) {
        this.product = JSON.parse(params['data']);
      } else {
        this.router.navigate(['/products']);
      }
    });
  }

  onSubmit(event: Product) {
    this.productsService.updateProduct(event).subscribe({
      next: () => {
        this.router.navigate(['/products']);
        this.notificationService.addNotification(this.updateProductSuccessMessage);
      },
      error: () => {
        this.notificationService.addNotification(this.updateProductErrorMessage);
      }
    });
  }
}
