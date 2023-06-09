import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
import { ITeam } from 'src/app/interfaces/ITeam.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css'],
})
export class AddTeamComponent implements OnInit {
  public message: string = '';
  public listLeader!: Array<IEmployee>;

  public userRole: string = 'Member';
  public addForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    leaderId: new FormControl(''),
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService,
    private teamService: TeamService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.employeeService
      .getListEmployee('Leader')
      .subscribe((res: Array<IEmployee>) => {
        this.listLeader = res;
        console.log(this.listLeader);
        this.userRole = this.cookieService.get('role');
        this.addForm = this.formBuilder.group({
          name: ['', [Validators.required]],
          leaderId: [this.listLeader[0]._id, [Validators.required]],
        });
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addForm.controls;
  }

  get leaderId() {
    return this.addForm.get('leaderId');
  }

  changeLeader(e: any) {
    console.log(e.target.value);
    this.leaderId?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  addTeam() {
    if (this.addForm.invalid) return;
    const name: string = this.addForm.value['name'];
    const leaderId: string = this.addForm.value['leaderId'];
    console.log(name + ' ' + leaderId);
    this.teamService.addTeam({ teamName: name, leaderID: leaderId }).subscribe(
      (res: ITeam) => {
        console.log(res);
      },
      (err: HttpErrorResponse) => {
        this.message = err.error.message;
      }
    );
  }
}
