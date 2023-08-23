import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { HttpService } from 'src/app/core/http/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpService) { }

  validProductId(id: string): Observable<boolean> {
    const params = new HttpParams().set('id', id);

    return this.http.get<boolean>('/bp/products/verification', params);
  }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/bp/products');
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/bp/products', product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>('/bp/products', product);
  }

  deleteProduct(id: string): Observable<boolean> {
    const params = new HttpParams().set('id', id);

    return this.http.delete<boolean>('/bp/products/', params);
  }
}
