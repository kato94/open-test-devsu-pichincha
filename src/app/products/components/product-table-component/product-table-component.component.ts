import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-product-table-component',
  templateUrl: './product-table-component.component.html',
  styleUrls: ['./product-table-component.component.sass']
})
export class ProductTableComponentComponent {

  @Input() products: Product[] = [];
  @Input() filterValue = '';
  @Output() onRefresh: EventEmitter<boolean> = new EventEmitter<boolean>();

  public itemsPerPage = 5;
  public currentPage = 1;
  public deleteProductSuccessMessage = 'Producto eliminado';
  public deleteProductErrorMessage = 'No se pudo eliminar el producto';

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private notificationService: NotificationService,
  ) { }

  get items(): Product[] {
    const firstItem = (this.currentPage - 1) * this.itemsPerPage;
    const lastItem = firstItem + this.itemsPerPage;

    const filteredProducts = this.filteredProducts;
    return filteredProducts.slice(firstItem, lastItem);
  }

  get filteredProducts() {
    return this.products.filter(item =>
      item.name.toLowerCase().includes(this.filterValue.trim().toLowerCase())
    );
  }

  get hasNextPage() {
    return this.currentPage * this.itemsPerPage < this.filteredProducts.length
  }

  get hasPreviousPage() {
    return this.currentPage > 1;
  }

  get results() {
    if (this.filteredProducts.length < this.itemsPerPage) {
      setTimeout(() => {
        this.currentPage = 1;
      });
    };
    return this.filteredProducts.length;
  }

  onEdit(product: Product) {
    this.router.navigate(['products', 'edit'], {
      queryParams: {
        data: JSON.stringify(product),
      }
    });
  }

  onDelete(id: string): void {
    this.productsService.deleteProduct(id).subscribe({
      next: () => {
        this.onRefresh.emit(true);
        this.notificationService.addNotification(this.deleteProductSuccessMessage);
      },
      error: () => this.notificationService.addNotification(this.deleteProductErrorMessage)
    });
  }
}
