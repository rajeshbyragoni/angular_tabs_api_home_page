import { TestBed } from '@angular/core/testing';

import { EditsubagentService } from './editsubagent.service';

describe('EditsubagentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditsubagentService = TestBed.get(EditsubagentService);
    expect(service).toBeTruthy();
  });
});
