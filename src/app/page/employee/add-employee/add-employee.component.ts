import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IEmployee } from 'src/app/interfaces/IEmployee.interface';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent {
  public message: string = '';
  public roleOptions!: any;

  public userRole: string = 'Member';
  public addForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    name: new FormControl(''),
    role: new FormControl(''),
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.roleOptions = ['Member', 'Leader', 'Admin'];
    this.userRole = this.cookieService.get('role');
    this.addForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      name: ['', [Validators.required]],
      role: ['Member', [Validators.required]],
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }

  get role() {
    return this.addForm.get('role');
  }

  changeRole(e: any) {
    console.log(e.target.value);
    this.role?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  addEmployee() {
    // if (this.addForm.invalid) return;
    const email: string = this.addForm.value['email'];
    const name: string = this.addForm.value['name'];
    const role: string = this.addForm.value['role'];
    this.employeeService
      .addEmployee({ name: name, email: email, role: role })
      .subscribe((res: IEmployee) => {
        console.log(res);
      });
  }
}
