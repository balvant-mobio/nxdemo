import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo, Profile } from '@nxdemo/data';
import { IFormBuilder, IFormGroup } from '@rxweb/types';
import {
  FormBuilder,
  Validators,
  UntypedFormGroup,
  UntypedFormControl,
  UntypedFormBuilder,
  UntypedFormArray,
  AbstractControl,
} from '@angular/forms';

@Component({
  selector: 'nxdemo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  todos: Todo[] = []; //[{ title: 'Todo 1' }, { title: 'Todo 2' }];
  profile: Profile = {} as Profile;

  todoForm: IFormGroup<Todo>;
  fb: IFormBuilder;

  profileForm: UntypedFormGroup = {} as UntypedFormGroup;

  constructor(
    private http: HttpClient,
    fb: FormBuilder,
    ufb: UntypedFormBuilder
  ) {
    this.fb = <IFormBuilder>fb;
    this.todoForm = this.fb.group<Todo>({
      title: ['', Validators.required],
    });
    this.fetch();

    this.profileForm = ufb.group({
      name: ['', Validators.required],
      locations: (() => {
        return ufb.array(
          [
            ufb.group({
              city: ['', Validators.required],
              state: ['', this._validateState.bind(this)],
            }),
            ufb.group({
              city: ['', Validators.required],
              state: ['', this._validateState.bind(this)],
            }),
          ]
          //Validators.required // required validator for whole array's control
        );
      })(),
    });
  }

  get locationControls(): AbstractControl[] {
    return (this.profileForm.get('locations') as UntypedFormArray).controls;
  }

  private _validateState(control: UntypedFormControl): any | null {
    if (control.value === 'gujarat') return null;
    else return { 'invalid state': true };
  }

  logForm() {
    console.log('form valid => ' + this.profileForm.valid);
    console.log('form =>', this.profileForm);
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
