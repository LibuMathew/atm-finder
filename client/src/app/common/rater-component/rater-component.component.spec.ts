import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaterComponentComponent } from './rater-component.component';

describe('RaterComponentComponent', () => {
  let component: RaterComponentComponent;
  let fixture: ComponentFixture<RaterComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaterComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
