import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TodoDateService } from '../todo-date.service'
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-item',
  templateUrl: './todo-list-item.component.html',
  styleUrls: ['./todo-list-item.component.css']
})
export class TodoListItemComponent {

  @Input()
  todo: Todo;

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor(private dateService: TodoDateService) { }

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }

  getDisplayableDate(): string {
    return this.todo.failedAfter.getDate() + ' ' +
            this.dateService.getMonthName(this.todo.failedAfter.getMonth()) +
            ' ' + this.todo.failedAfter.getFullYear();
  }
}
