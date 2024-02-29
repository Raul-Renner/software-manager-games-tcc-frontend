import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewColaboratorsComponent } from './view-colaborators.component';

describe('ViewColaboratorsComponent', () => {
  let component: ViewColaboratorsComponent;
  let fixture: ComponentFixture<ViewColaboratorsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewColaboratorsComponent]
    });
    fixture = TestBed.createComponent(ViewColaboratorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
