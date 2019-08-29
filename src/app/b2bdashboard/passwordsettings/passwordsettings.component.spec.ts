import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordsettingsComponent } from './passwordsettings.component';

describe('PasswordsettingsComponent', () => {
  let component: PasswordsettingsComponent;
  let fixture: ComponentFixture<PasswordsettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordsettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordsettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
