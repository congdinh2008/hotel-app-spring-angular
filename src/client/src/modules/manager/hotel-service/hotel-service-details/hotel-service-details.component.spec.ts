import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelServiceDetailsComponent } from './hotel-service-details.component';

describe('HotelServiceDetailsComponent', () => {
  let component: HotelServiceDetailsComponent;
  let fixture: ComponentFixture<HotelServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelServiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
