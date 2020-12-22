import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSlotsComponent } from './shared-slots.component';

describe('SharedSlotsComponent', () => {
  let component: SharedSlotsComponent;
  let fixture: ComponentFixture<SharedSlotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedSlotsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
