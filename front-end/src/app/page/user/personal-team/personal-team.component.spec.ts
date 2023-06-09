import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalTeamComponent } from './personal-team.component';

describe('PersonalTeamComponent', () => {
  let component: PersonalTeamComponent;
  let fixture: ComponentFixture<PersonalTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
