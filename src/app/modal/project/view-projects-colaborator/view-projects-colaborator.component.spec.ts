import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectsColaboratorComponent } from './view-projects-colaborator.component';

describe('ViewProjectsColaboratorComponent', () => {
  let component: ViewProjectsColaboratorComponent;
  let fixture: ComponentFixture<ViewProjectsColaboratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewProjectsColaboratorComponent]
    });
    fixture = TestBed.createComponent(ViewProjectsColaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
