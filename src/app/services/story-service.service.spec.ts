import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoryService } from './story-service.service';
import { of } from 'rxjs';

describe('MyService', () => {
  let service: StoryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StoryService], 
    });

    service = TestBed.inject(StoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call getTopStories with correct parameters', () => {
    const searchText = 'India';
    const pageNumber = 1;
    const pageSize = 10;

    const expectedUrl = `https://rsystemshackernewsapi.azurewebsites.net/api/Stories/NewStories?pageNumber=${pageNumber}&pageSize=${pageSize}&searchString=${searchText}`;

    const mockResponse = {
      stories: [
        { 'title': 'Return to India', 'by': 'Test', 'url': 'https://www.google.com' },
        { 'title': 'G20 summit India', 'by': 'India', 'url': 'https://www.google.com' },
        { 'title': 'Test Title', 'by': 'Title', 'url': '' },
      ],
      totalCount: 10,
    };
    
    service.getTopStories(searchText, pageNumber, pageSize).subscribe((data) => {
      expect(data).toEqual(mockResponse.stories); 
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET'); 

  });
});

