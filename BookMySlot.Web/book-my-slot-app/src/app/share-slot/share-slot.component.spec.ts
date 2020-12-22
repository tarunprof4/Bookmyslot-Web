import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareSlotComponent } from './share-slot.component';

describe('ShareSlotComponent', () => {
  let component: ShareSlotComponent;
  let fixture: ComponentFixture<ShareSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareSlotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
