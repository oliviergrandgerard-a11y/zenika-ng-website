import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { ProductCard } from './product-card';
import { By } from '@angular/platform-browser';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    fixture.componentRef.setInput('product', {
      title: 'TITLE',
      description: 'DESC',
      photo: 'PHOTO',
      price: 0,
      stock: 2,
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the product photo as image url', () => {
    fixture.detectChanges();

    const img = fixture.nativeElement.querySelector('img');

    expect(img).toBeTruthy();
    expect(img?.src).toContain(component.product().photo);
  });

  it('should display the product description', () => {
    const description = fixture.nativeElement.querySelector('small')?.textContent;

    expect(description).toBe(component.product().description);
  });

  it('should display the product title', () => {
    const title = fixture.nativeElement.querySelector('h3')?.textContent;

    expect(title).toContain(component.product().title);
  });

  it('should display the product price', () => {
    const price = fixture.nativeElement.querySelector('.card-text')?.textContent;

    expect(price).toContain(component.product().price);
  });

  it('should not add the "text-bg-warning" className when stock is different than 1', () => {
    const card = fixture.debugElement.query(By.css('.card'));

    expect(card.nativeElement.classList).not.toContain('text-bg-warning');
  });

  it('should add the "text-bg-warning" className when stock is equal to 1', () => {
    fixture.componentRef.setInput('product', {
      title: 'TITLE',
      description: 'DESC',
      photo: 'PHOTO',
      price: 0,
      stock: 1,
    });

    fixture.detectChanges();

    const card = fixture.debugElement.query(By.css('.card'));

    expect(card.nativeElement.classList).toContain('text-bg-warning');
  });
});
