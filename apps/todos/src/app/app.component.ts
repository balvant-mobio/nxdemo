import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  title: string;
}

@Component({
  selector: 'nxdemo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todos: Todo[] = []; //[{ title: 'Todo 1' }, { title: 'Todo 2' }];

  constructor(private http: HttpClient) {
    this.fetch();
  }

  fetch() {
    this.http.get<Todo[]>('/api/todos').subscribe((t) => (this.todos = t));
  }

  addTodo() {
    /*  this.todos.push({
      title: `New todo ${Math.floor(Math.random() * 1000)}`,
    }); */
    this.http
      .post<Todo[]>('/api/add-todo', {
        title: `New todo ${Math.floor(Math.random() * 1000)}`,
      })
      .subscribe((r) => {
        this.todos = r;
      });
  }
}
