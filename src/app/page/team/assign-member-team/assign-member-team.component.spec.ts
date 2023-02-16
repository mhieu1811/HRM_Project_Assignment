import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignMemberTeamComponent } from './assign-member-team.component';

describe('AssignMemberTeamComponent', () => {
  let component: AssignMemberTeamComponent;
  let fixture: ComponentFixture<AssignMemberTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignMemberTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssignMemberTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
