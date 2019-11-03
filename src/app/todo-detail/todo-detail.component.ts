import { Component, OnInit, Input } from "@angular/core";

import { Todos } from "../todos";
import { TodoService } from "../todo-service.service";

import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: "app-todo-detail",
  templateUrl: "./todo-detail.component.html",
  styleUrls: ["./todo-detail.component.css"]
})
export class TodoDetailComponent implements OnInit {
  @Input() hectic: Todos;

  constructor(
    private route: ActivatedRoute,
    private todoService: TodoService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getTodo();
  }

  getTodo(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.todoService.getTodo(id).subscribe(hectic => (this.hectic = hectic));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.todoService.updateTodo(this.hectic).subscribe(() => this.goBack());
  }
}
