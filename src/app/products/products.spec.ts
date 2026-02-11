import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Products } from './products';
import { ProductCard } from '../product-card/product-card';
import { By } from '@angular/platform-browser';
import { mockProducts } from './products.mock';

describe('Products', () => {
  let component: Products;
  let fixture: ComponentFixture<Products>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Products],
    }).compileComponents();

    fixture = TestBed.createComponent(Products);
    fixture.componentRef.setInput('products', mockProducts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mount productCard component', () => {
    const products = fixture.debugElement.queryAll(By.directive(ProductCard));
    expect(products).toHaveLength(3);
  });
});
