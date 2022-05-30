import {rest} from "msw";
import {v4 as uuid4} from "uuid";
import {TodoItem} from "~/types";

let initialTodos: TodoItem[] = [
  {
    id: uuid4(),
    content: "Prep the KT demo app",
    complete: true
  },
  {
    id: uuid4(),
    content: "Fix todo form functionality",
    complete: false
  },
  {
    id: uuid4(),
    content: "Make typing fail",
    complete: false
  }
];

export const handlers = [
  rest.get("https://fake.backend/todos", (req, res, ctx) => {
    // throw new Error("Could not connect to the database.");
    return res(ctx.json(initialTodos), ctx.status(200));
  })
];
