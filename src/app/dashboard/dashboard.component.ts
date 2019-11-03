import { Component, OnInit } from "@angular/core";
import { Todos } from "../todos";
import { TodoService } from "../todo-service.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  hectics: Todos[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService
      .getTodos()
      .subscribe(hectics => (this.hectics = hectics.slice(1, 5)));
  }
}
