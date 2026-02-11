import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../types/product';
import { calculateStock } from '../store/utils';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CatalogueService {
  private httpClient = inject(HttpClient);
  readonly url = 'http://localhost:8080/api';

  private _products = signal<Product[]>([]);

  readonly products = this._products.asReadonly();

  readonly hasProductsInStock = computed<boolean>(() =>
    this._products().some((product) => product.stock > 0),
  );

  setProducts(products: Product[]) {
    this._products.set(products);
  }

  getProductById(id: string) {
    return computed(() => this._products().find((p) => p.id === id));
  }

  fetchProducts(): void {
    this.httpClient
      .get<Product[]>(`${this.url}/products`)
      .subscribe((products) => this._products.set(products));
  }

  fetchProduct(productId: string): Observable<Product> {
    return this.httpClient.get<Product>(`${this.url}/products/${productId}`);
  }

  decreaseStock(productId: string) {
    const product = this.products().find((p) => p.id === productId);
    if (product?.stock && product.stock > 0) {
      this._products.update((list) => calculateStock(list, product));
    }
  }
}
