import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
})
export class Home implements OnInit {
  protected readonly products = signal<Product[]>([]);
  protected readonly featuredProducts = computed(() => this.products().slice(0, 3));
  protected readonly isLoadingProducts = signal(true);
  protected readonly productLoadError = signal('');

  private readonly productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoadingProducts.set(false);
      },
      error: () => {
        this.productLoadError.set('No se han podido cargar los productos del backend.');
        this.isLoadingProducts.set(false);
      },
    });
  }
}
