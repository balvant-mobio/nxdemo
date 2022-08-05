import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '@nxdemo/data';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'nxdemo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = []; //[{ title: 'Todo 1' }, { title: 'Todo 2' }];

  todoForm: IFormGroup<Todo>;
  fb: IFormBuilder;

  constructor(private http: HttpClient, fb: FormBuilder) {
    this.fb = <IFormBuilder>fb;
    this.todoForm = this.fb.group<Todo>({
      title: ['', Validators.required],
    });
    this.fetch();
  }

  ngOnInit(): void {
    console.log('init');
  }

  fetch() {
    this.http.get<Todo[]>('/api/todos').subscribe((t) => (this.todos = t));
  }

  addTodo() {
    if (!this.todoForm.valid) {
      console.log('Title is required.');
      return;
    }
    this.http
      .post<Todo[]>('/api/add-todo', {
        title: `New todo - ${this.todoForm.value?.title}`,
      })
      .subscribe((r) => {
        this.todos = r;
      });
  }
}
