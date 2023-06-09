import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListEmployeeAdminComponent } from './page/admin/list-employee-admin/list-employee-admin.component';
import { AddEmployeeComponent } from './page/employee/add-employee/add-employee.component';
import { DetailsEmployeeComponent } from './page/employee/details-employee/details-employee.component';
import { EditEmployeeComponent } from './page/employee/edit-employee/edit-employee.component';
import { ListEmployeeComponent } from './page/employee/list-employee/list-employee.component';
import { LoginComponent } from './page/login/login.component';
// import { UserInfoComponent } from './page/user/user-info/user-info.component';
import { UserinfoComponent } from './page/user/userinfo/userinfo.component';
import { AddTeamComponent } from './page/team/add-team/add-team.component';
import { DetailTeamComponent } from './page/team/detail-team/detail-team.component';
import { EditTeamComponent } from './page/team/edit-team/edit-team.component';
import { ListTeamComponent } from './page/team/list-team/list-team.component';
import { PersonalTeamComponent } from './page/user/personal-team/personal-team.component';
import { RoleGuard } from './core/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: UserinfoComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Member', 'Leader'] },
  },
  {
    path: 'employees/detail/:id',
    component: DetailsEmployeeComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Leader'] },
  },
  {
    path: 'employees',
    component: ListEmployeeComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Leader'] },
  },
  {
    path: 'admin',
    component: ListEmployeeAdminComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'employees/add',
    component: AddEmployeeComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Leader'] },
  },
  {
    path: 'employees/edit/:id',
    component: EditEmployeeComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Leader'] },
  },
  {
    path: 'teams/add',
    component: AddTeamComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'teams/edit/:id',
    component: EditTeamComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'teams',
    component: ListTeamComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'teams/details/:id',
    component: DetailTeamComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin'] },
  },
  {
    path: 'user/teams/:id',
    component: PersonalTeamComponent,
    canActivate: [RoleGuard],
    data: { roles: ['Admin', 'Member', 'Leader'] },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
