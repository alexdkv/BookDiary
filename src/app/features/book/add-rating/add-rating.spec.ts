import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRating } from './add-rating';

describe('AddRating', () => {
  let component: AddRating;
  let fixture: ComponentFixture<AddRating>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRating]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRating);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
