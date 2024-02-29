import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggedOrganizationComponent } from './logged-organization.component';

describe('LoggedOrganizationComponent', () => {
  let component: LoggedOrganizationComponent;
  let fixture: ComponentFixture<LoggedOrganizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoggedOrganizationComponent]
    });
    fixture = TestBed.createComponent(LoggedOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
