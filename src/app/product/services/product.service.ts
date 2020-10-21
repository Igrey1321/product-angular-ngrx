import { Product } from '../model/product.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class ProductService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('/api/products');
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>('/api/products', product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete('/api/products/' + productId);
  }

  updateProduct(productId: string | number, changes: Partial<Product>): Observable<any> {
    return this.http.put('/api/products/' + productId, changes);
  }
}