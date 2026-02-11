import { ComponentFixture, TestBed } from '@angular/core/testing';
import { App } from './app';
import { APP_TITLE } from './app.token';
import { BasketStore } from './store/basket.store';
import { BasketStoreMock } from './store/basket.store.mock';

describe('App', () => {
  let component: App;
  let basketStore: BasketStoreMock;
  let fixture: ComponentFixture<App>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        { provide: APP_TITLE, useValue: 'test' },
        { provide: BasketStore, useClass: BasketStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    basketStore = TestBed.inject(BasketStore) as unknown as BasketStoreMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the injected title as app title', () => {
    const title = fixture.nativeElement.querySelector('h1')?.textContent;
    expect(title).toBe('test');
  });

  it('should display the correct total price', () => {
    expect(component.totalPrice()).toBe(0);

    basketStore.totalPrice.set(5);
    expect(component.totalPrice()).toBe(5);
  });
});
