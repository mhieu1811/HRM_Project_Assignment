import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { IEmployee } from '../interfaces/IEmployee.interface';
import { IMessage } from '../interfaces/IMessage.interface';
import { IPersonal } from '../interfaces/IPersonal.interface';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  getListEmployee(role?: string): Observable<Array<IEmployee>> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.get<Array<IEmployee>>(
      environment.api_url + '/employees?role=' + role,
      header
    );
  }

  addEmployee(employees: IEmployee): Observable<IEmployee> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.post<IEmployee>(
      environment.api_url + '/employees/',
      employees,
      header
    );
  }
  getDetailsEmployee(employeeID: string): Observable<IPersonal> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.get<IPersonal>(
      environment.api_url + '/employees/' + employeeID,
      header
    );
  }
  deleteEmployee(employeeID: string): Observable<IMessage> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.delete<IMessage>(
      environment.api_url + '/employees/' + employeeID,
      header
    );
  }

  updateEmployee(
    employee: IEmployee,
    employeeID: string
  ): Observable<IMessage> {
    const header = {
      headers: new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.cookieService.get('userToken')}`
      ),
    };

    return this.http.put<IMessage>(
      environment.api_url + '/employees/' + employeeID,
      { employee: employee },
      header
    );
  }
}
