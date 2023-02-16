import { Component, Input } from '@angular/core';
import { IPersonal } from 'src/app/interfaces/IPersonal.interface';

@Component({
  selector: 'app-employee-info',
  templateUrl: './employee-info.component.html',
  styleUrls: ['./employee-info.component.css'],
})
export class EmployeeInfoComponent {
  @Input() information!: IPersonal;
}
