import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IEmployee } from 'src/app/interfaces/IEmployee.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css'],
})
export class ListEmployeeComponent {
  public listEmployees!: Array<IEmployee>;
  public userRole: string | null | undefined;
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.userRole = this.cookieService.get('role');
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
  detailEmployee(id: string) {
    this.router.navigate([`/employees/detail/${id}`]);
  }
  deleteEmployee(id: string, index: number): void {
    this.employeeService.deleteEmployee(id).subscribe((res) => {
      this.listEmployees.splice(index, 1);
    });
  }
  isEditAble(empRole: string): boolean {
    if (empRole === 'Leader') return false;
    return true;
  }
}
