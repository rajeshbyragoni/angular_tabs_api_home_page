import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubagentComponent } from './subagent.component';

describe('SubagentComponent', () => {
  let component: SubagentComponent;
  let fixture: ComponentFixture<SubagentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubagentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubagentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
