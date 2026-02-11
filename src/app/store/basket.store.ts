import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Product } from '../types/product';
import { CheckoutDetails } from '../basket/checkout-form/checkout-form/checkout';

@Injectable({ providedIn: 'root' })
export class BasketStore {
  private httpClient = inject(HttpClient);
  readonly url = 'http://localhost:8080/api';

  private _items = signal<Product[]>([]);
  private _totalPrice = signal<number>(0);
  private _totalItemsInBasket = signal<number>(0);

  readonly items = this._items.asReadonly();
  readonly totalPrice = this._totalPrice.asReadonly();
  readonly totalItemsInBasket = this._totalItemsInBasket.asReadonly();

  add(product: Product) {
    this._items.update((items) => [...items, product]);
    this._totalPrice.update((t) => (t += product.price));
    this._totalItemsInBasket.update((t) => t + 1);
    return this.httpClient.post(`${this.url}/basket`, { productId: product.id });
  }

  checkout(checkoutDetails: CheckoutDetails) {
    console.log({ checkoutDetails });
    return this.httpClient.post(`${this.url}/basket/checkout`, checkoutDetails);
  }
}
