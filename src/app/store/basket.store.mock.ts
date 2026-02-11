import { signal } from '@angular/core';

export class BasketStoreMock {
  totalItemsInBasket = signal<number>(0);
  totalPrice = signal<number>(0);
}
