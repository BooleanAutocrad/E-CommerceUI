import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFilterComponent } from './order-filter.component';

describe('OrderFilterComponent', () => {
  let component: OrderFilterComponent;
  let fixture: ComponentFixture<OrderFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrderFilterComponent]
    });
    fixture = TestBed.createComponent(OrderFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
