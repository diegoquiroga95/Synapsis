import { TestBed } from '@angular/core/testing';

import { ForgeviewerServiceService } from './forgeviewer-service.service';

describe('ForgeviewerServiceService', () => {
  let service: ForgeviewerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgeviewerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
