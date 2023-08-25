import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  const form = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [InputComponent]
    });

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    component.form = form;
    component.formName = 'name';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Must return invalid field', () => {
    component.form.get('name')?.markAsTouched();

    expect(component.isInvalidField).toBeTrue();
  });
});
