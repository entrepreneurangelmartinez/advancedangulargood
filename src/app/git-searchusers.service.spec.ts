import { TestBed } from '@angular/core/testing';

import { GitSearchusersService } from './git-searchusers.service';

describe('GitSearchusersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GitSearchusersService = TestBed.get(GitSearchusersService);
    expect(service).toBeTruthy();
  });
});
