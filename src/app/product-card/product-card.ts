import { Component, computed, input, output } from '@angular/core';
import { Product } from '../types/product';
import { CurrencyPipe } from '@angular/common';
import { BasketStore } from '../store/basket.store';
import { CatalogueService } from '../catalogue/catalogue.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  product = input.required<Product>();

  isLastChance = computed(() => this.product().stock === 1);

  constructor(
    private basket: BasketStore,
    private catalogue: CatalogueService,
  ) {}

  protected onClick(product: Product) {
    this.basket.add(product).subscribe();
    this.catalogue.decreaseStock(product.id);
  }
}
