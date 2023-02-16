import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/IEmployee.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent {
  public listEmployees!: Array<IEmployee>;
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.employeeService
      .getListEmployee()
      .subscribe((res: Array<IEmployee>) => {
        console.log(res);
        this.listEmployees = res;
      });
  }
  editEmployee(id: string) {
    this.router.navigate([`/employees/edit/${id}`]);
  }
  deleteEmployee(id: string, index: number): void {
    this.employeeService.deleteEmployee(id).subscribe((res) => {
      this.listEmployees.splice(index, 1);
    });
  }
}
