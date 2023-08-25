import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEditPageComponent } from './product-edit-page.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductsModule } from '../../products.module';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { Product } from '../../interfaces/product.interface';

describe('ProductEditPageComponent', () => {
  let component: ProductEditPageComponent;
  let fixture: ComponentFixture<ProductEditPageComponent>;
  let activatedRoute: ActivatedRoute;
  let productsService: ProductsService;
  let notificationService: NotificationService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, ProductsModule],
      declarations: [ProductEditPageComponent]
    });

    activatedRoute = TestBed.inject(ActivatedRoute);
    productsService = TestBed.inject(ProductsService);
    notificationService = TestBed.inject(NotificationService);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ProductEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('You must return product to update', () => {
    const product = {
      id: 'id',
      name: 'name',
      description: 'description',
      logo: 'logo',
      date_release: '2021-01-01',
      date_revision: '2021-01-01',
    }

    activatedRoute.queryParams = of({ data: JSON.stringify(product) } as Params);

    component.setProduct();

    expect(component.product).toEqual(product);
  });

  it('Must return product when updating', () => {
    const product: Product = {
      id: '123',
      name: 'Test',
      description: 'Test',
      logo: 'Test',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    };
    spyOn(productsService, 'updateProduct').and.returnValue(of(product));
    spyOn(notificationService, 'addNotification');
    spyOn(router, 'navigate');

    component.onSubmit(product);

    expect(router.navigate).toHaveBeenCalledWith(['/products']);
    expect(notificationService.addNotification).toHaveBeenCalledWith(component.updateProductSuccessMessage);
  });

  it('Should return error on update', () => {
    const product: Product = {
      id: '123',
      name: 'Test',
      description: 'Test',
      logo: 'Test',
      date_release: '2023-01-01',
      date_revision: '2024-01-01',
    };
    const errorResponse = new Error('Error');
    spyOn(productsService, 'updateProduct').and.returnValue(throwError(() => errorResponse));
    spyOn(notificationService, 'addNotification');

    component.onSubmit(product);

    expect(notificationService.addNotification).toHaveBeenCalledWith(component.updateProductErrorMessage);
  });
});
