import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductsService } from './products.service';
import { HttpService } from 'src/app/core/http/http';
import { IdValidator } from './id-validator.service';
import { of, throwError } from 'rxjs';
import { FormControl } from '@angular/forms';

describe('ProductsService', () => {
  let service: IdValidator;
  let productsService: ProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });
    service = TestBed.inject(IdValidator);
    productsService = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return null if id is valid', (done) => {
    const id = '123';
    const control = new FormControl(id);

    spyOn(productsService, 'validProductId').and.returnValue(of(false));

    service.validate(control).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });

  it('Should return validation error if id is invalid', (done) => {
    const id = '123';
    const control = new FormControl(id);

    spyOn(productsService, 'validProductId').and.returnValue(of(true));

    service.validate(control).subscribe(result => {
      expect(result).toEqual({ idExists: true });
      done();
    });
  });

  it('Should return validation error if id is invalid', (done) => {
    const id = '123';
    const control = new FormControl(id);
    const errorResponse = new Error('Error');

    spyOn(productsService, 'validProductId').and.returnValue(throwError(() => errorResponse));

    service.validate(control).subscribe(result => {
      expect(result).toBeNull();
      done();
    });
  });
});
