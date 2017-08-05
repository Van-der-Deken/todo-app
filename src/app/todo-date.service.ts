import { Injectable } from '@angular/core';
import { TodoDataService } from "./todo-data.service"
import { Todo } from "./todo";

@Injectable()
export class TodoDateService {


  constructor(private todoData: TodoDataService) { }

  checkForFailedTodos(todos: Todo[], currentDate: Date) {
    for(var i = 0; i < todos.length; i++) {
      if(this.remainToDeadline(todos[i].failedAfter, currentDate) < 0) {
        todos[i].failed = true;
        this.todoData.updateTodo(todos[i]);
      }
    }
  }

  sortTodosByDeadlines(todos: Todo[], currentDate: Date): Todo[] {
    var output : Todo[] = todos;
    output.sort((lValue, rValue) => {
      var lToDeadline = this.remainToDeadline(lValue.failedAfter, currentDate);
      var rToDeadline = this.remainToDeadline(rValue.failedAfter, currentDate);
      if(lToDeadline === rToDeadline) {
        return 0;
      } else {
        return (lToDeadline < rToDeadline) ? -1 : 1;
      }
    });
    var deadlines : number[] = [];
    for(var i = 0; i < output.length; i++) {
      deadlines.push(this.remainToDeadline(output[i].failedAfter, currentDate));
      if (deadlines[i] >= 0) {
        break;
      }
    }
    var temp : Todo;
    var offset = 0;
    for(var i = 0; i < deadlines.length - 1; i++, offset++) {
      temp = output[0];
      for(var j = 1; j < output.length - offset; j++) {
        output[j - 1] = output[j];
      }
      output[output.length - 1 - offset] = temp;
    }
    return output;
  }

  private remainToDeadline(todoDate: Date, currentDate: Date): number {
    var yearsDiff = todoDate.getFullYear() - currentDate.getFullYear();
    var monthsDiff = todoDate.getMonth() -  currentDate.getMonth();
    var daysDiff = todoDate.getDate() - currentDate.getDate();
    return yearsDiff * 100 + monthsDiff * 10 + daysDiff;
  }
}
