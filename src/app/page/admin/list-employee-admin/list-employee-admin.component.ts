import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/IEmployee.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee-admin',
  templateUrl: './list-employee-admin.component.html',
  styleUrls: ['./list-employee-admin.component.css'],
})
export class ListEmployeeAdminComponent {
  public listEmployees!: Array<IEmployee>;
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.employeeService
      .getListEmployee('Admin')
      .subscribe((res: Array<IEmployee>) => {
        console.log(res);
        this.listEmployees = res;
      });
  }
}
