import { Component, OnInit } from "@angular/core";
import { Todos } from "../todos";
import { TodoService } from "../todo-service.service";

@Component({
  selector: "app-todo",
  templateUrl: "./todo.component.html",
  styleUrls: ["./todo.component.css"]
})
export class TodoComponent implements OnInit {
  hectics: Todos[];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.getTodos();
  }
  getTodos(): void {
    this.todoService.getTodos().subscribe(hectics => (this.hectics = hectics));
  }

  // add click eventf
  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.todoService.addTodo({ name } as Todos).subscribe(hectic => {
      this.hectics.push(hectic);
    });
  }

  delete(hectic: Todos): void {
    this.hectics = this.hectics.filter(h => h !== hectic);
    this.todoService.deleteTodo(hectic).subscribe();
  }
}
