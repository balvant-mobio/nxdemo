import { Component, Input } from '@angular/core';
import { Todo } from '@nxdemo/data';

@Component({
  selector: 'nxdemo-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css'],
})
export class TodosComponent {
  @Input() todos: Todo[] = [];
}
