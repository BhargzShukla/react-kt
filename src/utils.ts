import {TodoItem} from "./types";

type JSONResponse = {
  data?: {
    initialTodos: TodoItem[];
  };
  error?: {
    message: string;
  };
};

export async function fetchApi(
  url: string,
  options = {}
): Promise<TodoItem[]> {
  try {
    let apiResponse = await fetch(url, options);
    let {data, error}: JSONResponse = await apiResponse.json();
    if (apiResponse.ok) {
      let initialTodos = data?.initialTodos;
      if (initialTodos) {
        return Object.assign(initialTodos, {fetchedAt: +new Date()});
      } else {
        return Promise.reject(new Error("No todos returned from API!"));
      }
    } else {
      let errorMessage = new Error(error?.message);
      return Promise.reject(errorMessage);
    }
  } catch (exception) {
    return Promise.reject(exception);
  }
}
