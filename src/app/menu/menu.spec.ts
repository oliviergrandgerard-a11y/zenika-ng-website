import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Menu } from './menu';
import { BasketStore } from '../store/basket.store';
import { BasketStoreMock } from '../store/basket.store.mock';

describe('Menu', () => {
  let component: Menu;
  let basketStore: BasketStoreMock;
  let fixture: ComponentFixture<Menu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Menu],
      providers: [{ provide: BasketStore, useClass: BasketStoreMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(Menu);
    component = fixture.componentInstance;
    basketStore = TestBed.inject(BasketStore) as unknown as BasketStoreMock;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the base amount of items in the basket', () => {
    expect(component.numberOfItems()).toBe(0);
  });

  it('should update the amount of items in the basket', () => {
    basketStore.totalItemsInBasket.set(3);
    expect(component.numberOfItems()).toBe(3);
  });
});
