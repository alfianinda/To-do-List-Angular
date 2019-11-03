import { InMemoryDbService } from "angular-in-memory-web-api";
import { Injectable } from "@angular/core";
import { Todos } from "./todos";
@Injectable({
  providedIn: "root"
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const hectics = [
      { id: 1, name: "learning angular" },
      { id: 2, name: "learning ui design" },
      { id: 3, name: "learning javascript" },
      { id: 4, name: "learning react js" },
      { id: 5, name: "laerning node js" },
      { id: 6, name: "learning express" },
      { id: 7, name: "working of my project" },
      { id: 8, name: "calling my mother" },
      { id: 9, name: "praying" },
      { id: 10, name: "watching a movie" },
      { id: 11, name: "working my geothermal project" }
    ];
    return { hectics };
  }

  genId(hectics: Todos[]): number {
    return hectics.length > 0
      ? Math.max(...hectics.map(hectic => hectic.id)) + 1
      : 11;
  }

  constructor() {}
}
