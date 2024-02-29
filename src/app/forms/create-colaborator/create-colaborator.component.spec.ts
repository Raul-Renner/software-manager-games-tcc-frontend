import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateColaboratorComponent } from './create-colaborator.component';

describe('CreateColaboratorComponent', () => {
  let component: CreateColaboratorComponent;
  let fixture: ComponentFixture<CreateColaboratorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateColaboratorComponent]
    });
    fixture = TestBed.createComponent(CreateColaboratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
