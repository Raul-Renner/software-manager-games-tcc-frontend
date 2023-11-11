import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDependenciesComponent } from './view-dependencies.component';

describe('ViewDependenciesComponent', () => {
  let component: ViewDependenciesComponent;
  let fixture: ComponentFixture<ViewDependenciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewDependenciesComponent]
    });
    fixture = TestBed.createComponent(ViewDependenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
