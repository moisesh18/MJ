import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollsComponent } from './enrolls.component';

describe('EnrollsComponent', () => {
  let component: EnrollsComponent;
  let fixture: ComponentFixture<EnrollsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnrollsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
