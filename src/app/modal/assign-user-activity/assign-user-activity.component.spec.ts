import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignUserActivityComponent } from './assign-user-activity.component';

describe('AssignUserActivityComponent', () => {
  let component: AssignUserActivityComponent;
  let fixture: ComponentFixture<AssignUserActivityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssignUserActivityComponent]
    });
    fixture = TestBed.createComponent(AssignUserActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
