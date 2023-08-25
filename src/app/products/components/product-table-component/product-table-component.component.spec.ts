import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableComponentComponent } from './product-table-component.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { of, throwError } from 'rxjs';

describe('ProductTableComponentComponent', () => {
  let component: ProductTableComponentComponent;
  let fixture: ComponentFixture<ProductTableComponentComponent>;
  let router: Router;
  let productsService: ProductsService;
  let notificationService: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [ProductTableComponentComponent]
    });

    router = TestBed.inject(Router);
    productsService = TestBed.inject(ProductsService);
    notificationService = TestBed.inject(NotificationService);
    fixture = TestBed.createComponent(ProductTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should filter products correctly', () => {
    component.products = [
      {
        id: 'id',
        name: 'name',
        description: 'description',
        logo: 'logo',
        date_release: '2021-01-01',
        date_revision: '2021-01-01',
      },
      {
        id: 'id',
        name: 'testing',
        description: 'description',
        logo: 'logo',
        date_release: '2021-01-01',
        date_revision: '2021-01-01',
      },
      {
        id: 'id',
        name: 'other',
        description: 'description',
        logo: 'logo',
        date_release: '2021-01-01',
        date_revision: '2021-01-01',
      },
    ];

    component.filterValue = 'testing';
    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts).toEqual([component.products[1]]);
    expect(component.products.length).toBe(3);

    component.filterValue = 'Testing';
    expect(component.filteredProducts[0].name).toBe('testing');

    component.filterValue = 'null';
    expect(component.filteredProducts.length).toBe(0);
  });

  it('Must return navigation to edit product', () => {
    const product = {
      id: 'id',
      name: 'name',
      description: 'description',
      logo: 'logo',
      date_release: '2021-01-01',
      date_revision: '2022-01-01',
    };

    spyOn(router, 'navigate');

    component.onEdit(product);

    expect(router.navigate).toHaveBeenCalledWith(['products', 'edit'], {
      queryParams: {
        data: JSON.stringify(product),
      }
    });
  });

  it('Must return message and refresh on deletion', () => {
    const id = '123';
    let res: boolean | undefined;
    spyOn(productsService, 'deleteProduct').and.returnValue(of(id));
    spyOn(notificationService, 'addNotification');

    component.onRefresh.subscribe((value) => {
      res = value;
    });

    component.onDelete(id);

    expect(res).toBeTrue();
    expect(notificationService.addNotification).toHaveBeenCalledWith(component.deleteProductSuccessMessage);
  });

  it('Should return error on delete', () => {
    const id = '123';
    const errorResponse = new Error('Error');
    spyOn(productsService, 'deleteProduct').and.returnValue(throwError(() => errorResponse));
    spyOn(notificationService, 'addNotification');

    component.onDelete(id);

    expect(notificationService.addNotification).toHaveBeenCalledWith(component.deleteProductErrorMessage);
  });
});
