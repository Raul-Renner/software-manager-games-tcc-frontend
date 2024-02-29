import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivitiesComponent } from './view-activities.component';

describe('ViewActivitiesComponent', () => {
  let component: ViewActivitiesComponent;
  let fixture: ComponentFixture<ViewActivitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewActivitiesComponent]
    });
    fixture = TestBed.createComponent(ViewActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
