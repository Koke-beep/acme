import { TestBed } from '@angular/core/testing';

import { AuthCredentialsGuard } from './auth-credentials.guard';

describe('AuthCredentialsGuard', () => {
  let guard: AuthCredentialsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthCredentialsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
