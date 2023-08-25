import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddPageComponent } from './product-add-page.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsModule } from '../../products.module';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Product } from '../../interfaces/product.interface';
import { of, throwError } from 'rxjs';

describe('ProductAddPageComponent', () => {
  let component: ProductAddPageComponent;
  let fixture: ComponentFixture<ProductAddPageComponent>;
  let productsService: ProductsService;
  let notificationService: NotificationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ProductsModule, RouterTestingModule],
      declarations: [ProductAddPageComponent]
    });

    productsService = TestBed.inject(ProductsService);
    notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Must return success to create', () => {
    const product: Product = {
      id: '123',
      name: 'Test',
      description: 'Test',
      logo: 'Test',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    };
    spyOn(productsService, 'createProduct').and.returnValue(of(product));
    spyOn(notificationService, 'addNotification');
    spyOn(router, 'navigate');

    component.onSubmit(product);

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
    expect(notificationService.addNotification).toHaveBeenCalledWith(component.addProductSuccessMessage);
  });

  it('Debe retornar error al actualizar', () => {
    const product: Product = {
      id: '123',
      name: 'Test',
      description: 'Test',
      logo: 'Test',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    };
    const errorResponse = new Error('Error');
    spyOn(productsService, 'createProduct').and.returnValue(throwError(() => errorResponse));
    spyOn(notificationService, 'addNotification');

    component.onSubmit(product);

    expect(notificationService.addNotification).toHaveBeenCalledWith(component.addProductErrorMessage);
  });
});
