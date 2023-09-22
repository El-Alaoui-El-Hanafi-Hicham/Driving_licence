import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveTestComponent } from './reserve-test.component';

describe('ReserveTestComponent', () => {
  let component: ReserveTestComponent;
  let fixture: ComponentFixture<ReserveTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveTestComponent]
    });
    fixture = TestBed.createComponent(ReserveTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
