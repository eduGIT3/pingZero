import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly apiUrl = isPlatformBrowser(this.platformId)
    ? '/api/categories'
    : 'http://localhost:8080/api/categories';

  constructor(private readonly http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }
}
