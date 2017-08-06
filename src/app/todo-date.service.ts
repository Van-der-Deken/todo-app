import { Injectable } from '@angular/core';
import { TodoDataService } from "./todo-data.service"
import { Todo } from "./todo";

@Injectable()
export class TodoDateService {
  private monthNames = ["january", "february", "march", "april", "may", "june",
                        "july", "august", "september", "october", "november",
                        "december"];

  constructor(private todoData: TodoDataService) { }

  //Mark every failed todo (todo, for which remainToDeadline returned less than 0)
  markFailedTodos(todos: Todo[], currentDate: Date): boolean {
    var marked = false;
    for(var i = 0; i < todos.length; i++) {
      if(!todos[i].failed && this.remainToDeadline(todos[i].failedAfter, currentDate) < 0) {
        this.todoData.updateTodoById(todos[i].id, { failed: true });
        marked = true;
      }
    }
    return marked;
  }

  sortByDeadlines(todos: Todo[], currentDate: Date) {
    todos.sort((lValue, rValue) => {
      var lToDeadline = this.remainToDeadline(lValue.failedAfter, currentDate);
      var rToDeadline = this.remainToDeadline(rValue.failedAfter, currentDate);
      if(lToDeadline === rToDeadline) {
        return 0;
      } else {
        return (lToDeadline < rToDeadline) ? -1 : 1;
      }
    });
    var counter = 0;
    //Counting failed todos
    for(; this.remainToDeadline(todos[counter].failedAfter, currentDate) < 0; counter++);
    var temp : Todo;
    var offset = 0;
    //Move them to the end
    for(var i = 0; i < counter; i++, offset++) {
      temp = todos[0];
      for(var j = 1; j < todos.length - offset; j++) {
        todos[j - 1] = todos[j];
      }
      todos[todos.length - 1 - offset] = temp;
    }
  }

  getMonthName(month: number): string {
    return this.monthNames[month];
  }

  private remainToDeadline(todoDate: Date, currentDate: Date): number {
    var yearsDiff = Math.abs(todoDate.getFullYear() - currentDate.getFullYear());
    var monthsDiff = Math.abs(todoDate.getMonth() -  currentDate.getMonth());
    var daysDiff = Math.abs(todoDate.getDate() - currentDate.getDate());
    if((yearsDiff + monthsDiff + daysDiff) != 0) {
      return todoDate.getTime() - currentDate.getTime();
    } else {
      return 0;
    }
  }
}
