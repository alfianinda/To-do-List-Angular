import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TodoComponent } from "./todo/todo.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TodoDetailComponent } from "./todo-detail/todo-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "todo/:id", component: TodoDetailComponent },
  { path: "todo", component: TodoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
