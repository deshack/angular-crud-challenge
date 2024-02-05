import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';  // Importa HttpClientModule
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],  // Aggiungi HttpClientModule agli imports
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
