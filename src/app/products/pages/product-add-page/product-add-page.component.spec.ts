import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddPageComponent } from './product-add-page.component';

xdescribe('ProductAddPageComponent', () => {
  let component: ProductAddPageComponent;
  let fixture: ComponentFixture<ProductAddPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductAddPageComponent]
    });
    fixture = TestBed.createComponent(ProductAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
