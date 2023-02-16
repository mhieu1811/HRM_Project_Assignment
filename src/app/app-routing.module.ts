import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeAdminComponent } from './page/admin/list-employee-admin/list-employee-admin.component';
import { AddEmployeeComponent } from './page/employee/add-employee/add-employee.component';
import { DetailsEmployeeComponent } from './page/employee/details-employee/details-employee.component';
import { EditEmployeeComponent } from './page/employee/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './page/employee/list-employee/list-employee.component';
import { LoginComponent } from './page/login/login.component';
// import { UserInfoComponent } from './page/user/user-info/user-info.component';
import { AddTeamComponent } from './page/team/add-team/add-team.component';
import { EditTeamComponent } from './page/team/edit-team/edit-team.component';
import { ListTeamComponent } from './page/team/list-team/list-team.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  // { path: 'personal', component: UserInfoComponent },
  { path: 'employees/detail/:id', component: DetailsEmployeeComponent },
  { path: 'employees', component: ListEmployeeComponent },
  { path: 'employees/add', component: AddEmployeeComponent },
  { path: 'employees/edit/:id', component: EditEmployeeComponent },
  { path: 'teams/add', component: AddTeamComponent },
  { path: 'teams/edit/:id', component: EditTeamComponent },
  { path: 'teams', component: ListTeamComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
