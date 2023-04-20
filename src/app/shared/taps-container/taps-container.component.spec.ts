import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TapsContainerComponent } from './taps-container.component';

describe('TapsContainerComponent', () => {
  let component: TapsContainerComponent;
  let fixture: ComponentFixture<TapsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TapsContainerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TapsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
