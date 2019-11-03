import { Injectable } from "@angular/core";

import { Todos } from "./todos";
import { MessageService } from "./message.service";

import { Observable, of } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class TodoService {
  private todosUrl = "api/hectics"; // url to web api

  httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  /** GET Todos from the server */
  getTodos(): Observable<Todos[]> {
    return this.http.get<Todos[]>(this.todosUrl).pipe(
      tap(_ => this.log("fetched todo")),
      catchError(this.handleError<Todos[]>("getTodos", []))
    );
  }

  getTodo(id: number): Observable<Todos> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.get<Todos>(url).pipe(
      tap(_ => this.log(`fetched todo id=${id}`)),
      catchError(this.handleError<Todos>(`getTodo id=${id}`))
    );
  }

  getFoodNo404<Data>(id: number): Observable<Todos> {
    const url = `${this.todosUrl}/?id=${id}`;
    return this.http.get<Todos[]>(url).pipe(
      map(Todos => Todos[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} todo id=${id}`);
      }),
      catchError(this.handleError<Todos>(`getTodo id=${id}`))
    );
  }

  updateTodo(hectic: Todos): Observable<any> {
    return this.http.put(this.todosUrl, hectic, this.httpOptions).pipe(
      tap(_ => this.log(`update todo id=${hectic.id}`)),
      catchError(this.handleError<any>("update todo"))
    );
  }

  // add todo
  addTodo(hectic: Todos): Observable<Todos> {
    return this.http.post<Todos>(this.todosUrl, hectic, this.httpOptions).pipe(
      tap((newTodo: Todos) => this.log(`added todo w/ id={newTodo.id}`)),
      catchError(this.handleError<Todos>("addTodo"))
    );
  }

  /** DELETE: delete from the server */
  deleteTodo(hectic: Todos | number): Observable<Todos> {
    const id = typeof hectic === "number" ? hectic : hectic.id;
    const url = `${this.todosUrl}/${id}`;

    return this.http.delete<Todos>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted todo id=${id}`)),
      catchError(this.handleError<Todos>("deleteTodo"))
    );
  }

  // search
  searchTodos(term: string): Observable<Todos[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Todos[]>(`${this.todosUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found todo matching "${term}"`)),
      catchError(this.handleError<Todos[]>("searchTodos", []))
    );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    this.messageService.add(`TodoService: ${message}`);
  }
}
