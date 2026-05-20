import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { Category, Product, ProductPayload, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-admin-products',
  imports: [ReactiveFormsModule],
  templateUrl: './admin-products.html',
})
export class AdminProducts implements OnInit {
  protected readonly products = signal<Product[]>([]);
  protected readonly categories = signal<Category[]>([]);
  protected readonly selectedProduct = signal<Product | null>(null);
  protected readonly isLoading = signal(true);
  protected readonly message = signal('');
  protected readonly error = signal('');

  private readonly formBuilder = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly categoryService = inject(CategoryService);

  protected readonly productForm = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    manufacturer: ['', [Validators.required, Validators.minLength(2)]],
    categoryId: [0, [Validators.required, Validators.min(1)]],
  });

  ngOnInit(): void {
    this.loadInitialData();
  }

  protected saveProduct(): void {
    this.message.set('');
    this.error.set('');

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const payload = this.buildPayload();
    const selectedProduct = this.selectedProduct();
    const request = selectedProduct
      ? this.productService.updateProduct(selectedProduct.id, payload)
      : this.productService.createProduct(payload);

    request.subscribe({
      next: () => {
        this.message.set(selectedProduct ? 'Producto actualizado.' : 'Producto creado.');
        this.cancelEdit();
        this.loadProducts();
      },
      error: () => this.error.set('No se ha podido guardar el producto.'),
    });
  }

  protected editProduct(product: Product): void {
    this.selectedProduct.set(product);
    this.message.set('');
    this.error.set('');
    this.productForm.setValue({
      name: product.name,
      manufacturer: product.manufacturer,
      categoryId: product.category?.id || 0,
    });
  }

  protected deleteProduct(product: Product): void {
    this.message.set('');
    this.error.set('');

    this.productService.deleteProduct(product.id).subscribe({
      next: () => {
        if (this.selectedProduct()?.id === product.id) {
          this.cancelEdit();
        }

        this.message.set('Producto eliminado.');
        this.loadProducts();
      },
      error: () => this.error.set('No se ha podido eliminar el producto.'),
    });
  }

  protected cancelEdit(): void {
    this.selectedProduct.set(null);
    this.productForm.reset({
      name: '',
      manufacturer: '',
      categoryId: 0,
    });
  }

  private loadInitialData(): void {
    this.isLoading.set(true);
    this.error.set('');

    this.categoryService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.loadProducts();
      },
      error: () => {
        this.error.set('No se han podido cargar las categorias.');
        this.isLoading.set(false);
      },
    });
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('No se han podido cargar los productos.');
        this.isLoading.set(false);
      },
    });
  }

  private buildPayload(): ProductPayload {
    const formValue = this.productForm.getRawValue();

    return {
      name: formValue.name,
      manufacturer: formValue.manufacturer,
      category: {
        id: Number(formValue.categoryId),
      },
    };
  }
}
