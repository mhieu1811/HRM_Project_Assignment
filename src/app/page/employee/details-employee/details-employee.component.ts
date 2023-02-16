import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPersonal } from 'src/app/interfaces/IPersonal.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-details-employee',
  templateUrl: './details-employee.component.html',
  styleUrls: ['./details-employee.component.css'],
})
export class DetailsEmployeeComponent {
  public userInformation!: IPersonal;
  public id: string | null | undefined = '';
  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) this.router.navigate(['/']);

    this.employeeService
      .getDetailsEmployee(this.id!)
      .subscribe((res: IPersonal) => {
        this.userInformation = res;
      });
  }
}
