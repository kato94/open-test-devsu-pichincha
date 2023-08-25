import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, delay, map, of, switchMap } from 'rxjs';
import { ProductsService } from './products.service';

@Injectable({
  providedIn: 'root'
})
export class IdValidator implements AsyncValidator {

  constructor(private productsService: ProductsService) { }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {

    return of(control.value).pipe(
      delay(500),
      switchMap((id) => this.productsService.validProductId(id).pipe(
        map((valid) => valid ? { idExists: true } : null),
        catchError(() => of(null))
      ))

    );
  }
}
