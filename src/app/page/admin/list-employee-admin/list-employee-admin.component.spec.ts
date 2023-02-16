import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeeAdminComponent } from './list-employee-admin.component';

describe('ListEmployeeAdminComponent', () => {
  let component: ListEmployeeAdminComponent;
  let fixture: ComponentFixture<ListEmployeeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListEmployeeAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListEmployeeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
