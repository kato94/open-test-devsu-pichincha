import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTableComponentComponent } from './product-table-component.component';

xdescribe('ProductTableComponentComponent', () => {
  let component: ProductTableComponentComponent;
  let fixture: ComponentFixture<ProductTableComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductTableComponentComponent]
    });
    fixture = TestBed.createComponent(ProductTableComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
