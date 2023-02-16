import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './page/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { EmployeeInfoComponent } from './components/employee-info/employee-info.component';
import { TeamInfoComponent } from './components/team-info/team-info.component';
import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { DetailsEmployeeComponent } from './page/employee/details-employee/details-employee.component';
import { EditEmployeeComponent } from './page/employee/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './page/employee/list-employee/list-employee.component';
import { ListEmployeeAdminComponent } from './page/admin/list-employee-admin/list-employee-admin.component';
import { AddEmployeeComponent } from './page/employee/add-employee/add-employee.component';
import { HeaderComponent } from './utils/header/header.component';
import { PersonalTeamComponent } from './page/user/personal-team/personal-team.component';
import { AddTeamComponent } from './page/team/add-team/add-team.component';
import { EditTeamComponent } from './page/team/edit-team/edit-team.component';
import { AssignMemberTeamComponent } from './page/team/assign-member-team/assign-member-team.component';
import { ListTeamComponent } from './page/team/list-team/list-team.component';
import { DetailTeamComponent } from './page/team/detail-team/detail-team.component';
import { UserinfoComponent } from './page/user/userinfo/userinfo.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EmployeeInfoComponent,
    TeamInfoComponent,
    EmployeeFormComponent,
    AddEmployeeComponent,
    TeamFormComponent,
    UserinfoComponent,
    DetailsEmployeeComponent,
    EditEmployeeComponent,
    ListEmployeeComponent,
    HeaderComponent,
    PersonalTeamComponent,
    AddTeamComponent,
    EditTeamComponent,
    AssignMemberTeamComponent,
    ListTeamComponent,
    DetailTeamComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
