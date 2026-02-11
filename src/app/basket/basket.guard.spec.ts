import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { basketGuard } from './basket.guard';

describe('basketGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => basketGuard());

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
