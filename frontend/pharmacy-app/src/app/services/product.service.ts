import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  manufacturer: string;
  category: Category | null;
}

export interface ProductPayload {
  name: string;
  manufacturer: string;
  category: {
    id: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly apiUrl = isPlatformBrowser(this.platformId)
    ? '/api/products'
    : 'http://localhost:8080/api/products';

  constructor(private readonly http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(product: ProductPayload): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: number, product: ProductPayload): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
