import { signal } from '@angular/core';
import { Product } from '../types/product';
import { Observable, of } from 'rxjs';
import { calculateStock } from '../store/utils';

export class CatalogueMock {
  products = signal<Product[]>([
    { id: 'ID_1', title: 'TITLE_1', description: 'DESC_1', photo: 'PHOTO_1', price: 3, stock: 2 },
    { id: 'ID_2', title: 'TITLE_2', description: 'DESC_2', photo: 'PHOTO_2', price: 2, stock: 1 },
    { id: 'ID_3', title: 'TITLE_3', description: 'DESC_3', photo: 'PHOTO_3', price: 1, stock: 0 },
  ]);

  hasProductsInStock = signal(true);

  fetchProducts(): Observable<Product[]> {
    return of(this.products());
  }

  decreaseStock(productId: string) {
    const product = this.products().find((p) => p.id === productId);
    if (product?.stock && product.stock > 0) {
      this.products.update((list) => calculateStock(list, product));
    }
  }
}
