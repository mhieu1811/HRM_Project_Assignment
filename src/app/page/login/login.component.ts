import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public email: string = '';
  public password: string = '';
  constructor(private loginService: LoginService) {}

  login() {
    this.loginService.login(this.email, this.password).subscribe((res: any) => {
      console.log(res);
    });
  }
}
