import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateFutureDateFromToday } from 'src/app/core/validators/validators';
import { IdValidator } from '../../services/id-validator.service';
import { Product } from '../../interfaces/product.interface';
import { getNextYear } from 'src/app/core/utils/date.utils';

@Component({
  selector: 'app-product-form-component',
  templateUrl: './product-form-component.component.html',
  styleUrls: ['./product-form-component.component.sass']
})
export class ProductFormComponentComponent {
  @Input() title: string = 'Formulario';
  @Input() toBack: string = '/';
  @Input() initFormValues?: Product;
  @Output() onSubmit: EventEmitter<Product> = new EventEmitter<Product>();

  public form: FormGroup = this.fb.group({
    id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)], [this.idValidator]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required]],
    date_release: ['', [Validators.required, validateFutureDateFromToday]],
    date_revision: [''],
  });

  constructor(private fb: FormBuilder, private idValidator: IdValidator) { }

  ngOnInit(): void {
    this.hasInitialValues();
    this.onDateReleaseChange();
  }

  onSave() {
    this.onSubmit.emit(this.form.value);
  }

  onDateReleaseChange() {
    this.form.get('date_release')?.valueChanges.subscribe((dateRelease) => {
      const dateRevision = this.form.get('date_revision');
      if (dateRelease) {
        dateRevision?.setValue(getNextYear(dateRelease));
      } else {
        dateRevision?.setValue('');
      }
    });
  }

  hasInitialValues() {
    // if (this.initFormValues !== undefined) {
    if (this.initFormValues) {
      this.form.patchValue({
        ...this.initFormValues,
        date_release: this.initFormValues.date_release?.split('T')[0],
        date_revision: this.initFormValues.date_release?.split('T')[0],
      });
      this.form.get('id')?.clearAsyncValidators();
    }
  }

  resetForm() {
    if (this.initFormValues) {
      this.hasInitialValues();
    } else {
      this.form.reset();
    }
  }
}
