import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IEmployee } from 'src/app/interfaces/IEmployee.interface';
import { IMessage } from 'src/app/interfaces/IMessage.interface';
import { IPersonal } from 'src/app/interfaces/IPersonal.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent {
  public message: string = '';
  public roleOptions!: any;
  public userRole: string = 'Member';
  public currentEmployee!: IEmployee;
  public id!: string | undefined | null;
  public editForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    role: new FormControl(''),
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) this.router.navigate(['/']);

    this.roleOptions = ['Member', 'Leader', 'Admin'];

    this.employeeService
      .getDetailsEmployee(this.id!)
      .subscribe((res: IPersonal) => {
        this.currentEmployee = res.employee;
        this.userRole = this.cookieService.get('role');
        this.editForm = this.formBuilder.group({
          email: [
            this.currentEmployee.email,
            [
              Validators.required,
              Validators.pattern(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              ),
            ],
          ],
          name: [this.currentEmployee.name, [Validators.required]],
          role: [this.currentEmployee.role, [Validators.required]],
        });
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  get role() {
    return this.editForm.get('role');
  }

  changeRole(e: any) {
    this.role?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  editEmployee() {
    if (!this.editForm.dirty || this.editForm.invalid) return;
    const email: string = this.editForm.value['email'];
    const name: string = this.editForm.value['name'];
    const role: string = this.editForm.value['role'];
    const employee: IEmployee = { name: name, email: email, role };
    console.log(email);
    this.employeeService.updateEmployee(employee, this.id!).subscribe(
      (res: IMessage) => {
        if (this.userRole === 'Admin') this.router.navigate(['/admin']);
        else this.router.navigate(['/employees']);
      },
      (err: HttpErrorResponse) => {
        this.message = err.error.message;
      }
    );
  }
}
