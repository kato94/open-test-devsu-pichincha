import { TestBed } from '@angular/core/testing';
import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { Product } from '../interfaces/product.interface';
import { HttpService } from 'src/app/core/http/http';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpService: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });
    service = TestBed.inject(ProductsService);
    httpService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Must return products', () => {
    const products: Product[] = [
      {
        id: 'id1',
        name: 'name',
        description: 'description',
        logo: 'logo',
        date_release: '2021-01-01',
        date_revision: '2022-01-01',
      },
      {
        id: 'id2',
        name: 'name',
        description: 'description',
        logo: 'logo',
        date_release: '2021-01-01',
        date_revision: '2022-01-01',
      },
    ];
    const productsUrl = '/bp/products';

    service.getProducts().subscribe(response => {
      expect(response).toEqual(products);
    });

    const req = httpTestingController.expectOne(`${httpService.baseUrl}${productsUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(products);
  });

  it('Must return product when creating', () => {
    const product: Product = {
      id: 'id1',
      name: 'name',
      description: 'description',
      logo: 'logo',
      date_release: '2021-01-01',
      date_revision: '2022-01-01',
    };
    const productUrl = '/bp/products';

    service.createProduct(product).subscribe(response => {
      expect(response).toEqual(product);
    });

    const req = httpTestingController.expectOne(`${httpService.baseUrl}${productUrl}`);
    expect(req.request.method).toBe('POST');
    req.flush(product);
  });

  it('Must return product when updating', () => {
    const product: Product = {
      id: 'id1',
      name: 'name',
      description: 'description',
      logo: 'logo',
      date_release: '2021-01-01',
      date_revision: '2022-01-01',
    };
    const productUrl = '/bp/products';

    service.updateProduct(product).subscribe(response => {
      expect(response).toEqual(product);
    });

    const req = httpTestingController.expectOne(`${httpService.baseUrl}${productUrl}`);
    expect(req.request.method).toBe('PUT');
    req.flush(product);
  });

  it('Must return string on delete', () => {
    const id = 'id1';
    const productUrl = '/bp/products';
    const params = new HttpParams().set('id', id).toString();

    service.deleteProduct(id).subscribe(response => {
      expect(response).toEqual(id);
    });

    const req = httpTestingController.expectOne(`${httpService.baseUrl}${productUrl}?${params}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(id);
  });

  it('Must return boolean when validating id', () => {
    const id = 'id1';
    const res = true;
    const productUrl = '/bp/products/verification';
    const params = new HttpParams().set('id', id).toString();

    service.validProductId(id).subscribe(response => {
      expect(response).toEqual(res);
    });

    const req = httpTestingController.expectOne(`${httpService.baseUrl}${productUrl}?${params}`);
    expect(req.request.method).toBe('GET');
    req.flush(res);
  });
});
