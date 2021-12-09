import { TestBed } from '@angular/core/testing';

import { DecisaoFirestoreService } from './decisao-firestore.service';

describe('DecisaoService', () => {
  let service: DecisaoFirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecisaoFirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
