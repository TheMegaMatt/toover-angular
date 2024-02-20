import {Component, input} from '@angular/core';
import {NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'oa-empty-list',
  standalone: true,
  imports: [
    NgIf,
    RouterLink
  ],
  templateUrl: './empty-list.component.html',
  styles: ``
})
export class EmptyListComponent {
  showCreate = input(true);
  createLink = input<string | any[] | null>();
  emptyMessage = input<string>("");
  createMessage = input<string>("");
}
