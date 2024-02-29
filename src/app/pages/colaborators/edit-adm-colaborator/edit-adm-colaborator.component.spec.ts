import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdmColaboratorComponent } from './edit-adm-colaborator.component';

describe('EditAdmColaboratorComponent', () => {
  let component: EditAdmColaboratorComponent;
  let fixture: ComponentFixture<EditAdmColaboratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAdmColaboratorComponent]
    });
    fixture = TestBed.createComponent(EditAdmColaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
