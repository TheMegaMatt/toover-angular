import {Component, EventEmitter, inject, input, OnInit, Output, signal} from '@angular/core';
import {JsonPipe, NgClass, NgIf} from "@angular/common";
import {RolesService} from "@/features/employees/services/roles.service";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'oa-role-picker-dialog',
  standalone: true,
  imports: [
    NgIf,
    TranslateModule,
    JsonPipe,
    NgClass
  ],
  templateUrl: './role-picker-dialog.component.html',
  styles: ``
})
export class RolePickerDialogComponent implements OnInit {
  open = input(false);
  @Output() confirm = new EventEmitter();
  @Output() cancel = new EventEmitter();
  api = inject(RolesService);
  roles = signal<string[]>([])
  selected = signal("");
  ngOnInit() {
    this.api.getAll().subscribe({
      next: (data) => {
        this.roles.set(data.items)
      }
    })
  }
}
