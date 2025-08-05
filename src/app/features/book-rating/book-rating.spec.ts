import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookRating } from './book-rating';

describe('BookRating', () => {
  let component: BookRating;
  let fixture: ComponentFixture<BookRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookRating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
