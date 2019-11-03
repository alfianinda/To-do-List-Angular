import { Component, OnInit } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";

import { Todos } from "../todos";
import { TodoService } from "../todo-service.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  hectics$: Observable<Todos[]>;
  private searchTerm = new Subject<string>();

  constructor(private todoService: TodoService) {}

  search(term: string): void {
    this.searchTerm.next(term);
  }

  ngOnInit(): void {
    this.hectics$ = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.todoService.searchTodos(term))
    );
  }
}
