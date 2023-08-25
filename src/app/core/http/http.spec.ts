import { TestBed } from '@angular/core/testing';

import { HttpService } from './http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environments } from 'src/environments/environments';

describe('HttpService', () => {
  let httpService: HttpService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpService = TestBed.inject(HttpService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(httpService).toBeTruthy();
  });

  it('Should send GET request', () => {
    const testData = { message: 'Test Data' };
    const url = '/test';

    httpService.get(url).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}${url}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });

  it('Should send POST request', () => {
    const testData = { message: 'Test Data' };
    const url = '/test';

    httpService.post(url, testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}${url}`);
    expect(req.request.method).toBe('POST');
    req.flush(testData);
  });

  it('Should send PUT request', () => {
    const testData = { message: 'Test Data' };
    const url = '/test';

    httpService.put(url, testData).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}${url}`);
    expect(req.request.method).toBe('PUT');
    req.flush(testData);
  });

  it('Should send DELETE request', () => {
    const testData = { message: 'Test Data' };
    const url = '/test';

    httpService.delete(url).subscribe(data => {
      expect(data).toEqual(testData);
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}${url}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(testData);
  });
});
