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
        console.log('Hieu');
        this.listEmployees = res;
        console.log(res);
      });
  }
  editEmployee(id: string) {
    this.router.navigate([`/employees/edit/${id}`]);
  }
  detailEmployee(id: string) {
    this.router.navigate([`/employees/detail/${id}`]);
  }
  deleteEmployee(id: string, index: number): void {
    this.employeeService.deleteEmployee(id).subscribe((res) => {
      this.listEmployees.splice(index, 1);
    });
  }
}
