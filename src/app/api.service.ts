import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Http, Response } from '@angular/http';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

const API_URL = environment.apiUrl;

@Injectable()
export class ApiService {

  constructor(private http: Http) { }

  public getAllTodos(): Observable<Todo[]> {
    return this.http
      .get(API_URL + '/todos')
      .map(response => {
        const todos = response.json();
        var output: Todo[] = todos.map((todo) => new Todo(todo));
        for(var i = 0; i < todos.length; i++) {
          output[i].failedAfter = new Date(todos[i].failedAfter);
        }
        return output;
      })
      .catch(this.handleError);
  }

  public createTodo(todo: Todo) {
    return this.http.post(API_URL + '/todos', todo)
      .map(response => {
        var output: Todo = new Todo(response.json());
        output.failedAfter = new Date(response.json().failedAfter);
        return output;
        //return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public getTodoById(todoId: number) {
    return this.http.get(API_URL + '/todos/' + todoId)
      .map(response => {
        var output: Todo = new Todo(response.json());
        output.failedAfter = new Date(response.json().failedAfter);
        return output;
        //return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public updateTodo(todo: Todo) {
    return this.http.put(API_URL + '/todos/' + todo.id, todo)
      .map(response => {
        var output: Todo = new Todo(response.json());
        output.failedAfter = new Date(response.json().failedAfter);
        return output;
        //return new Todo(response.json());
      })
      .catch(this.handleError);
  }

  public deleteTodoById(todoId: number) {
    return this.http.delete(API_URL + '/todos/' + todoId)
      .map(response => null)
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }
}
