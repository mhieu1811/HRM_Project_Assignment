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
import { ITeam } from 'src/app/interfaces/ITeam.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css'],
})
export class EditTeamComponent {
  public message: string = '';
  public listLeader!: Array<IEmployee>;
  public id: string | undefined | null = '';
  public currentTeam!: ITeam;

  public editForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    leaderId: new FormControl(''),
  });
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private teamService: TeamService,
    private cookieService: CookieService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) this.router.navigate(['/']);

    this.teamService.getTeamDetails(this.id!).subscribe((res: ITeam) => {
      this.currentTeam = res;
      this.editForm = this.formBuilder.group({
        name: [this.currentTeam.teamName, [Validators.required]],
      });
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editForm.controls;
  }

  get leaderId() {
    return this.editForm.get('leaderId');
  }

  changeLeader(e: any) {
    console.log(e.target.value);
    this.leaderId?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  editTeam() {
    if (!this.editForm.dirty || this.editForm.invalid) return;
    const name: string = this.editForm.value['name'];
    this.teamService.updateTeam({ teamName: name }, this.id!).subscribe(() => {
      this.router.navigate(['/teams']);
    });
  }
}
