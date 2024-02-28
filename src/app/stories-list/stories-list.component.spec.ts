import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoriesListComponent } from './stories-list.component';
import { StoryService } from '../services/story-service.service';
import { of, throwError } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

describe('StoriesListComponent', () => {
  let component: StoriesListComponent;
  let fixture: ComponentFixture<StoriesListComponent>;
  let storyService: jasmine.SpyObj<StoryService>;;
  const errorMessage = 'An error occurred';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [StoriesListComponent],
      providers: [
        {
          provide: StoryService,
          useValue: jasmine.createSpyObj('StoryService', ['getTopStories']),
        },
      ],
    });
    fixture = TestBed.createComponent(StoriesListComponent);
    component = fixture.componentInstance;
    storyService = storyService = TestBed.inject(StoryService) as jasmine.SpyObj<StoryService>;
  });

  it('should update hackerNewsStoryList and totalCount on successful getStories call', () => {
    const expectedResult = {
      stories: [
        { 'title': 'Return to India', 'by': 'Test', 'url': 'https://www.google.com' },
        { 'title': 'G20 summit India', 'by': 'India', 'url': 'https://www.google.com' },
        { 'title': 'Test Title', 'by': 'Title', 'url': '' },
      ],
      totalCount: 10,
    };

    storyService.getTopStories.and.returnValue(of(expectedResult.stories));

    component.getStories('');

    expect(storyService.getTopStories).toHaveBeenCalledWith('', component.pageIndex + 1, component.pageSize);
  });

  it('should call getStories with the correct search term', () => {
    const searchValue = 'India';

    const event = new KeyboardEvent('keyup', { key: searchValue });
    const textarea = document.createElement('textarea');
    textarea.value=searchValue;
    fixture.nativeElement.appendChild(textarea);
    expect(textarea.value).toBe('India');
    spyOn(component, 'getStories');
    textarea.dispatchEvent(event);
    component.search(event);

    expect(component.getStories).toHaveBeenCalledWith(searchValue);
  });

  it('should update pageIndex, totalCount, pageSize, and call getStories', () => {
    const pageEvent: PageEvent = {
      pageIndex: 2,
      pageSize: 20,
      length: 100,
    };

    spyOn(component, 'getStories');

    component.handlePageEvent(pageEvent);

    expect(component.pageIndex).toEqual(pageEvent.pageIndex);
    expect(component.totalCount).toEqual(pageEvent.length);
    expect(component.pageSize).toEqual(pageEvent.pageSize);

    expect(component.getStories).toHaveBeenCalledWith('');
  });

  it('should call window.open with the correct URL and target', () => {
    const openSpy = spyOn(window, 'open');
    component.open('https://www.google.com');
    expect(openSpy).toHaveBeenCalledWith('https://www.google.com', '_blank');
  });

});
