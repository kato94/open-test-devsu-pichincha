import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListPageComponent } from './product-list-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsModule } from '../../products.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsService } from '../../services/products.service';
import { of, throwError } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { NotificationService } from 'src/app/core/services/notification.service';

describe('ProductListPageComponent', () => {
  let component: ProductListPageComponent;
  let fixture: ComponentFixture<ProductListPageComponent>;
  let productsService: ProductsService;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ProductsModule, RouterTestingModule],
      declarations: [ProductListPageComponent],
    });

    productsService = TestBed.inject(ProductsService);
    notificationService = TestBed.inject(NotificationService);
    fixture = TestBed.createComponent(ProductListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must return the list of products', () => {
    const products: Product[] = [
      {
        id: '123',
        name: 'Test',
        description: 'Test',
        logo: 'Test',
        date_release: '2023-01-01',
        date_revision: '2024-01-01',
      }
    ];
    spyOn(productsService, 'getProducts').and.returnValue(of(products));

    component.getProducts();

    expect(component.products).toEqual(products);
  });

  it('Must return send a notification if there is an error in the service', () => {
    const errorResponse = new Error('Error');
    spyOn(productsService, 'getProducts').and.returnValue(throwError(() => errorResponse));
    spyOn(notificationService, 'addNotification');

    component.getProducts();

    expect(notificationService.addNotification).toHaveBeenCalledWith(component.getProductsErrorMessage);
    expect(component.products).toEqual([]);
  });
});
