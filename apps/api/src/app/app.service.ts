import { Injectable } from '@nestjs/common';
import { Todo } from '@nxdemo/data';

@Injectable()
export class AppService {
  todos: Todo[] = [{ title: 'Todo 1' }, { title: 'Todo 2' }];

  getData(): Todo[] {
    return this.todos;
  }

  addTodo(todo: Todo) {
    this.todos.push(todo);
    return this.todos;
  }
}
