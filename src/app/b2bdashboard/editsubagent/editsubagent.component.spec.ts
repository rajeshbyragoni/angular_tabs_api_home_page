import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsubagentComponent } from './editsubagent.component';

describe('EditsubagentComponent', () => {
  let component: EditsubagentComponent;
  let fixture: ComponentFixture<EditsubagentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditsubagentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsubagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
