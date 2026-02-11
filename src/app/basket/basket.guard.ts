import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { BasketStore } from '../store/basket.store';

export const basketGuard: CanMatchFn = () => {
  const basketStore = inject(BasketStore);
  return basketStore.items().length > 0;
};
