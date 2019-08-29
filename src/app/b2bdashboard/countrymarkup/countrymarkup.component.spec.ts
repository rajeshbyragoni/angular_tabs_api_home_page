import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountrymarkupComponent } from './countrymarkup.component';

describe('CountrymarkupComponent', () => {
  let component: CountrymarkupComponent;
  let fixture: ComponentFixture<CountrymarkupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountrymarkupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountrymarkupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
