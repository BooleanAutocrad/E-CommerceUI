import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedReviewComponent } from './detailed-review.component';

describe('DetailedReviewComponent', () => {
  let component: DetailedReviewComponent;
  let fixture: ComponentFixture<DetailedReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailedReviewComponent]
    });
    fixture = TestBed.createComponent(DetailedReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
