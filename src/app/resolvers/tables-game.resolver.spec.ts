import { TestBed } from '@angular/core/testing';

import { TablesGameResolver } from './tables-game.resolver';

describe('TablesGameResolver', () => {
  let resolver: TablesGameResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TablesGameResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
