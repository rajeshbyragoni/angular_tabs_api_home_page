import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubagentdepositComponent } from './subagentdeposit.component';

describe('SubagentdepositComponent', () => {
  let component: SubagentdepositComponent;
  let fixture: ComponentFixture<SubagentdepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubagentdepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubagentdepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
