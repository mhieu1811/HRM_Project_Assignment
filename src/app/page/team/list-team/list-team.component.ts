import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IListTeam } from 'src/app/interfaces/IListTeam.interface';
import { IMessage } from 'src/app/interfaces/IMessage.interface';
import { ITeam } from 'src/app/interfaces/ITeam.interface';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-list-team',
  templateUrl: './list-team.component.html',
  styleUrls: ['./list-team.component.css'],
})
export class ListTeamComponent {
  public listTeam!: Array<IListTeam>;
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.teamService.getListTeam().subscribe((res: Array<IListTeam>) => {
      this.listTeam = res;
    });
  }
  editTeam(id: string) {
    this.router.navigate([`/teams/edit/${id}`]);
  }
  detailsTeam(id: string) {
    this.router.navigate([`/teams/details/${id}`]);
  }
  deleteTeam(id: string, index: number): void {
    this.teamService.deleteTeam(id).subscribe((res) => {
      this.listTeam.splice(index, 1);
    });
  }
}
