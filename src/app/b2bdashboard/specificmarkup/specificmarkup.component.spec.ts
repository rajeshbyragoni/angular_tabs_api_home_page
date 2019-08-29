import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificmarkupComponent } from './specificmarkup.component';

describe('SpecificmarkupComponent', () => {
  let component: SpecificmarkupComponent;
  let fixture: ComponentFixture<SpecificmarkupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecificmarkupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecificmarkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
