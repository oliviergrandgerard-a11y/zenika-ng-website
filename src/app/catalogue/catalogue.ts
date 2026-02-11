import { Component, computed, effect, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Products } from '../products/products';
import { APP_TITLE } from '../app.token';
import { BasketStore } from '../store/basket.store';
import { CatalogueService } from './catalogue.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Products, CurrencyPipe, RouterLink],
  templateUrl: './catalogue.html',
  styleUrl: './catalogue.css',
})
export class Catalogue {
  private catalogueService = inject(CatalogueService);
  private basket = inject(BasketStore);
  appTitle = inject(APP_TITLE);

  readonly items = computed(() => this.catalogueService.products());
  readonly totalPrice = computed(() => this.basket.totalPrice());

  constructor() {
    this.catalogueService.fetchProducts();
  }
}
