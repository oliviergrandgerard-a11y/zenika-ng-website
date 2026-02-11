import { Component, computed } from '@angular/core';
import { BasketStore } from '../store/basket.store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [RouterLink],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  constructor(private basket: BasketStore) {}
  numberOfItems = computed<number>(() => this.basket.totalItemsInBasket());
}
