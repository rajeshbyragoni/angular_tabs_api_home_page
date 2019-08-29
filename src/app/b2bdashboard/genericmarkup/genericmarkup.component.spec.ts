import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericmarkupComponent } from './genericmarkup.component';

describe('GenericmarkupComponent', () => {
  let component: GenericmarkupComponent;
  let fixture: ComponentFixture<GenericmarkupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenericmarkupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenericmarkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
