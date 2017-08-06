import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  constructor() { }

  toggleTodoComplete(todo: Todo) {
    this.toggleComplete.emit(todo);
  }

  removeTodo(todo: Todo) {
    this.remove.emit(todo);
  }

  getDisplayableDate() {
    var output : string = this.todo.failedAfter.getDate().toString();
    switch(this.todo.failedAfter.getMonth()) {
      case 0: {
        output += ' january ';
        break;
      }
      case 1: {
        output += ' february ';
        break;
      }
      case 2: {
        output += ' march ';
        break;
      }
      case 3: {
        output += ' april ';
        break;
      }
      case 4: {
        output += ' may ';
        break;
      }
      case 5: {
        output += ' june ';
        break;
      }
      case 6: {
        output += ' july ';
        break;
      }
      case 7: {
        output += ' august ';
        break;
      }
      case 8: {
        output += ' september ';
        break;
      }
      case 9: {
        output += ' october ';
        break;
      }
      case 10: {
        output += ' november ';
        break;
      }
      case 11: {
        output += ' december ';
        break;
      }
    }
    return output += this.todo.failedAfter.getFullYear();
  }
}
