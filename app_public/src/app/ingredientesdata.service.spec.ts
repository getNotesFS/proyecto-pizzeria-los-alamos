import { TestBed } from '@angular/core/testing';

import { IngredientesdataService } from './ingredientesdata.service';

describe('IngredientesdataService', () => {
  let service: IngredientesdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientesdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
