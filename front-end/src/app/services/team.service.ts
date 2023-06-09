import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IListTeam } from '../interfaces/IListTeam.interface';
import { IMessage } from '../interfaces/IMessage.interface';
import { IGetTeam, ITeam } from '../interfaces/ITeam.interface';

@Injectable({
  providedIn: 'root',
})
export class TeamService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getListTeam(): Observable<Array<IListTeam>> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.get<Array<IListTeam>>(
      environment.api_url + '/teams/',
      header
    );
  }

  getTeamDetails(teamId: string): Observable<IGetTeam> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.get<IGetTeam>(
      environment.api_url + '/teams/' + teamId,
      header
    );
  }

  addTeam(team: ITeam): Observable<ITeam> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.post<ITeam>(environment.api_url + '/teams/', team, header);
  }

  updateTeam(team: ITeam, teamID: string): Observable<ITeam> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.put<ITeam>(
      environment.api_url + '/teams/' + teamID,
      { team: team },
      header
    );
  }

  deleteTeam(teamID: string): Observable<ITeam> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.delete<ITeam>(
      environment.api_url + '/teams/' + teamID,
      header
    );
  }

  assignMember(memberID: string, teamID: string): Observable<IMessage> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.post<IMessage>(
      environment.api_url + '/teams/assignMember',
      { teamID: teamID, memberID: memberID },
      header
    );
  }

  deleteMember(memberID: string, teamID: string): Observable<IMessage> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.post<IMessage>(
      environment.api_url + '/teams/deleteMember',
      { teamID: teamID, memberID: memberID },
      header
    );
  }

  assignLeader(memberID: string, teamID: string): Observable<IMessage> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.post<IMessage>(
      environment.api_url + '/teams/assignLeader',
      { teamID: teamID, memberID: memberID },
      header
    );
  }
}
