import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, Subscription, filter } from 'rxjs';
import { IEmployee } from 'src/app/interfaces/IEmployee.interface';
import { IMessage } from 'src/app/interfaces/IMessage.interface';
import { IGetTeam } from 'src/app/interfaces/ITeam.interface';
import { EmployeeService } from 'src/app/services/employee.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-detail-team',
  templateUrl: './detail-team.component.html',
  styleUrls: ['./detail-team.component.css'],
})
export class DetailTeamComponent implements OnInit {
  public team: IGetTeam | undefined;
  public members: Array<IEmployee> | undefined;
  public canAssignMember: Array<IEmployee> | undefined;
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
    const getlistMember: Observable<Array<IEmployee>> =
      this.employeeService.getListEmployee('Member');
    this.teamService.getTeamDetails(this.id!).subscribe((res: IGetTeam) => {
      this.team = res;
      this.members = res.members;
      console.log(this.team);
      getlistMember.subscribe((response: Array<IEmployee>) => {
        this.canAssignMember = response;
        this.canAssignMember = this.canAssignMember!.filter(
          (ar) => !this.members!.find((rm) => rm._id === ar._id)
        );
        console.log(this.canAssignMember);
      });
    });
  }

  isChanged() {
    const getlistMember: Observable<Array<IEmployee>> =
      this.employeeService.getListEmployee('Member');
    this.teamService.getTeamDetails(this.id!).subscribe((res: IGetTeam) => {
      this.team = res;
      this.members = res.members;
      console.log(this.team);
      getlistMember.subscribe((response: Array<IEmployee>) => {
        this.canAssignMember = response;
        this.canAssignMember = this.canAssignMember!.filter(
          (ar) => !this.members!.find((rm) => rm._id === ar._id)
        );
        console.log(this.canAssignMember);
      });
    });
  }

  deleteEmp(id: string) {
    this.teamService.deleteMember(id, this.id!).subscribe((res: IMessage) => {
      this.isChanged();
    });
  }

  assignMember(id: string) {
    this.teamService.assignMember(id, this.id!).subscribe((res: IMessage) => {
      this.isChanged();
    });
  }
}
