import { TestBed } from '@angular/core/testing';

import { Catalogue } from './catalogue.service';
import { mockProducts } from '../products/products.mock';

describe('Catalogue', () => {
  let service: Catalogue;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(Catalogue);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should expose initial products', () => {
    service.setProducts(mockProducts);

    const products = service.products();

    expect(products.length).toBe(3);
    expect(products[0].id).toBe('ID_1');
  });

  it('should have hasProductsInStock as true when at least one product is available', () => {
    service.setProducts(mockProducts);
    expect(service.hasProductsInStock()).toBe(true);
  });

  it('should have hasProductsInStock as false when no product is available', () => {
    service.setProducts(mockProducts.map((p) => ({ ...p, stock: 0 })));
    expect(service.hasProductsInStock()).toBe(false);
  });

  it('should decrease stock for a product when descraseStock is called', () => {
    service.setProducts(mockProducts);
    service.decreaseStock('ID_1');
    const product = service.products().find((p) => p.id === 'ID_1');

    expect(product?.stock).toBe(1);
  });

  it('should not decrease the product stock when stock is empty', () => {
    service.setProducts(mockProducts.map((p) => ({ ...p, stock: 0 })));
    service.decreaseStock('ID_1');
    const product = service.products().find((p) => p.id === 'ID_1');

    expect(product?.stock).toBe(0);
  });
});
