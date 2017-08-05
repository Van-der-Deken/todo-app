import { TestBed, inject } from '@angular/core/testing';

import { TodoDateService } from './todo-date.service';

describe('TodoDateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDateService]
    });
  });

  it('should be created', inject([TodoDateService], (service: TodoDateService) => {
    expect(service).toBeTruthy();
  }));
});
