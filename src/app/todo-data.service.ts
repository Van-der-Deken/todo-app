import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoDataService {
  lastId: number = 0;
  todos: Todo[] = [];

  constructor() {
  }

  addTodo(todo: Todo): Todo[] {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this.todos;
  }

  deleteTodoById(id: number): Todo[] {
    this.todos = this.todos
      .filter(todo => todo.id !== id);
    return this.todos;
  }

  updateTodoById(id: number, values: Object = {}) {
    var todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  getAllTodos(): Todo[] {
    return this.todos;
  }

  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  toggleTodoComplete(todo: Todo){
    var updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }
}
