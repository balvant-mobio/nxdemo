import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './todos/todos.component';
import { HighlightDirective } from './directives/highlight.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TodosComponent, HighlightDirective],
  exports: [TodosComponent],
})
export class UiModule {}
