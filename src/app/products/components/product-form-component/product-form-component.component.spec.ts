import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductFormComponentComponent } from './product-form-component.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProductFormComponentComponent', () => {
  let component: ProductFormComponentComponent;
  let fixture: ComponentFixture<ProductFormComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, ReactiveFormsModule, RouterTestingModule],
      declarations: [ProductFormComponentComponent],
    });
    fixture = TestBed.createComponent(ProductFormComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must return initial value in form', () => {
    const form = {
      id: 'id',
      name: 'name',
      description: 'description',
      logo: 'logo',
      date_release: '2021-01-01',
      date_revision: '2021-01-01',
    }
    component.initFormValues = form;

    component.hasInitialValues();

    expect(component.form.value).toEqual(form);
  });
});
