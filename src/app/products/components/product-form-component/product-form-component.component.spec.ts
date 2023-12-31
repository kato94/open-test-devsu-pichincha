import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductFormComponentComponent } from './product-form-component.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../../interfaces/product.interface';

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

  it('Must return initial value in form on save', () => {
    let res: Product | undefined;

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

    component.onSubmit.subscribe((value) => {
      res = value;
    })

    component.onSave();

    expect(res).toEqual(form);
  });

  it('It should return form reset', () => {
    const form = {
      id: null,
      name: null,
      description: null,
      logo: null,
      date_release: null,
      date_revision: null,
    }
    component.resetForm();

    expect(component.form.value).toEqual(form);
  });

  it('It must return form reset when it has initial value', () => {
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

    component.resetForm();

    expect(component.form.value).toEqual(form);
  });
});
