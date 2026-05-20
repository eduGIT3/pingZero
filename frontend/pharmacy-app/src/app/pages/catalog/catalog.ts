import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.html',
})
export class Catalog implements OnInit {
  protected readonly products = signal<Product[]>([]);
  protected readonly selectedCategory = signal('Todas');
  protected readonly isLoadingProducts = signal(true);
  protected readonly productLoadError = signal('');
  protected readonly totalProducts = computed(() => this.products().length);
  protected readonly categories = computed(() => {
    const categoryNames = this.products()
      .map((product) => product.category?.name || 'Sin categoria')
      .filter((category, index, categories) => categories.indexOf(category) === index);

    return categoryNames.sort();
  });
  protected readonly filteredProducts = computed(() => {
    const selectedCategory = this.selectedCategory();

    if (selectedCategory === 'Todas') {
      return this.products();
    }

    return this.products().filter((product) => {
      const categoryName = product.category?.name || 'Sin categoria';
      return categoryName === selectedCategory;
    });
  });

  private readonly productService = inject(ProductService);

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoadingProducts.set(false);
      },
      error: () => {
        this.productLoadError.set(
          'No se han podido cargar los productos. Comprueba que Spring Boot esta arrancado en http://localhost:8080.',
        );
        this.isLoadingProducts.set(false);
      },
    });
  }

  protected selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
