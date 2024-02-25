import {Component, input} from '@angular/core';
import {Place} from "@/features/places/models/entity";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {Employee} from "@/features/employees/models/entity";
import {NgIf} from "@angular/common";

@Component({
  selector: 'oa-employees-card-list',
  standalone: true,
  imports: [
    TranslateModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './employees-card-list.component.html',
  styles: ``
})
export class EmployeesCardListComponent {
  employees = input.required<Employee[]>()
  loading = input.required<boolean>();
  filter = input.required<string>();
}
