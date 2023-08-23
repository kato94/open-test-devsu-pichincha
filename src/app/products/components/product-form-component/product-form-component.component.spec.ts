import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFormComponentComponent } from './product-form-component.component';

describe('ProductFormComponentComponent', () => {
  let component: ProductFormComponentComponent;
  let fixture: ComponentFixture<ProductFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponentComponent]
    });
    fixture = TestBed.createComponent(ProductFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
