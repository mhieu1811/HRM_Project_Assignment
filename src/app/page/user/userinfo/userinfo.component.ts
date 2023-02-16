import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { IPersonal } from 'src/app/interfaces/IPersonal.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-userinfo',
  templateUrl: './userinfo.component.html',
  styleUrls: ['./userinfo.component.css'],
})
export class UserinfoComponent implements OnInit {
  public personalInfo!: IPersonal;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getPersonal().subscribe((res: IPersonal) => {
      this.personalInfo = res;
      console.log(this.personalInfo);
    });
  }
}
