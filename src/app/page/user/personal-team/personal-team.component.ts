import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployee } from 'src/app/interfaces/IEmployee.interface';
import { IGetTeam } from 'src/app/interfaces/ITeam.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-personal-team',
  templateUrl: './personal-team.component.html',
  styleUrls: ['./personal-team.component.css'],
})
export class PersonalTeamComponent {
  public team: IGetTeam | undefined;
  public members: Array<IEmployee> | undefined;
  public id: string | null | undefined;
  constructor(
    private teamService: TeamService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (!this.id) this.router.navigate(['/']);

    this.teamService.getTeamDetails(this.id!).subscribe((res: IGetTeam) => {
      this.team = res;
      this.members = res.members;
    });
  }
}
