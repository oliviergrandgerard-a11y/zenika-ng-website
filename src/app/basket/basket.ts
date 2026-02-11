import { Component, computed } from '@angular/core';
import { BasketStore } from '../store/basket.store';
import { CurrencyPipe } from '@angular/common';
import { CheckoutForm } from './checkout-form/checkout-form/checkout-form';

@Component({
  selector: 'app-basket',
  imports: [CurrencyPipe, CheckoutForm],
  templateUrl: './basket.html',
  styleUrl: './basket.css',
})
export class Basket {
  constructor(private basketStore: BasketStore) {}

  items = computed(() => this.basketStore.items());
  totalPrice = computed(() => this.basketStore.totalPrice());
}
