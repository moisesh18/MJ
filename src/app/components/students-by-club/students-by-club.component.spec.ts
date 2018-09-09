import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsByClubComponent } from './students-by-club.component';

describe('StudentsByClubComponent', () => {
  let component: StudentsByClubComponent;
  let fixture: ComponentFixture<StudentsByClubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentsByClubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentsByClubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
