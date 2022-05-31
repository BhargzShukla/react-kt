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
    complete: true
  }
];

export const handlers = [
  rest.get("https://fake.backend/todos", (req, res, ctx) => {
    let successResponse = res(
      ctx.status(200),
      ctx.json({data: {initialTodos}, error: null}),
      ctx.delay(1000)
    );
    let errorResponse = res(
      ctx.status(500),
      ctx.json({
        data: {initialTodos: null},
        error: {message: "Could not connect to the database!"}
      }),
      ctx.delay(1000)
    );
    return successResponse;
    // return errorResponse;
  })
];
