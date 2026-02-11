import { Routes } from '@angular/router';
import { Catalogue } from './catalogue/catalogue';
import { Basket } from './basket/basket';
import { basketGuard } from './basket/basket.guard';
import { EmptyBasket } from './empty-basket/empty-basket';

export const routes: Routes = [
  { path: 'catalog', component: Catalogue },
  { path: 'basket', component: Basket, canMatch: [basketGuard] },
  { path: 'basket', component: EmptyBasket },
  {
    path: 'product/:id',
    loadComponent: () => import('./product-details/product-details'),
  },
  { path: '**', redirectTo: 'catalog' },
];
