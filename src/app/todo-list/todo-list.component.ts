import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoDateService } from '../todo-date.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  private sortedTodos : Todo[];

  @Input()
  set todos(todos: Todo[]) {
    var currentDate = new Date();
    this.sortedTodos = this.dateService.sortTodosByDeadlines(todos, currentDate);
    this.dateService.checkForFailedTodos(this.sortedTodos, currentDate);
  }

  get todos(): Todo[] { return this.sortedTodos; }

  @Output()
  remove: EventEmitter<Todo> = new EventEmitter();

  @Output()
  toggleComplete: EventEmitter<Todo> = new EventEmitter();

  constructor(private dateService: TodoDateService) { }

  onToggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  onRemoveTodo(todo: Todo) {
    this.remove.emit(todo);
  }
}
