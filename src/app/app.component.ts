import { Component, OnInit } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';
import { TodoDateService } from './todo-date.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];

  constructor(private todoDataService: TodoDataService,
    private dateService : TodoDateService) {
  }

  public ngOnInit() {
    this.todos =  this.todoDataService.getAllTodos();
    //Every minute check for new failed todos
    setInterval(this.updateTodoList(false), 60000);
  }

  onToggleTodoComplete(todo: Todo) {
    todo = this.todoDataService.toggleTodoComplete(todo);
  }

  onRemoveTodo(todo: Todo) {
    this.todos = this.todoDataService.deleteTodoById(todo.id);
  }

  onAddTodo(todo: Todo) {
    this.todos = this.todoDataService.addTodo(todo);
    this.updateTodoList(true);
  }

  private updateTodoList(insertedTodo: boolean) {
    var currentDate = new Date();
    if(this.dateService.markFailedTodos(this.todos, currentDate) || insertedTodo) {
      this.dateService.sortByDeadlines(this.todos, currentDate);
    }
  }
}
