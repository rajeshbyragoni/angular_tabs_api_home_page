import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsledgerComponent } from './accountsledger.component';

describe('AccountsledgerComponent', () => {
  let component: AccountsledgerComponent;
  let fixture: ComponentFixture<AccountsledgerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsledgerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
