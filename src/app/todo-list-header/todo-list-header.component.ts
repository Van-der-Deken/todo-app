import { Component, Output, EventEmitter } from '@angular/core';
import { Todo } from '../todo';

@Component({
  selector: 'app-todo-list-header',
  templateUrl: './todo-list-header.component.html',
  styleUrls: ['./todo-list-header.component.css']
})
export class TodoListHeaderComponent {

  newTodo: Todo = new Todo();

  @Output()
  add: EventEmitter<Todo> = new EventEmitter();

  constructor() {
  }

  addTodo() {
    //Chosen date receiving as string, so it should be transformed to Date
    if(typeof this.newTodo.failedAfter === 'string') {
      this.newTodo.failedAfter = new Date(this.newTodo.failedAfter);
    }
    this.add.emit(this.newTodo);
    this.newTodo = new Todo();
  }

}
