import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancilreportingComponent } from './financilreporting.component';

describe('FinancilreportingComponent', () => {
  let component: FinancilreportingComponent;
  let fixture: ComponentFixture<FinancilreportingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancilreportingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancilreportingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
