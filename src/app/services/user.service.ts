import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IPersonal } from '../interfaces/IPersonal.interface';
import { ITeam } from '../interfaces/ITeam.interface';
import { loginReturnValue } from '../interfaces/loginReturnValue.interface';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  login(email: string, password: string): Observable<loginReturnValue> {
    return this.http.post<loginReturnValue>(
      environment.api_url + '/user/login',
      {
        email: email,
        password: password,
      }
    );
  }
  getPersonal(): Observable<IPersonal> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };
    return this.http.get<IPersonal>(
      environment.api_url + '/user/personal',
      header
    );
  }

  getTeamDetailsPersonal(teamId: string): Observable<ITeam> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };
    return this.http.get<ITeam>(
      environment.api_url + '/user/team/' + teamId,
      header
    );
  }
}
