import produce from "immer";
import * as React from "react";
import {v4 as uuid4} from "uuid";
import {TodoItem} from "~/types";
import {fetchApi} from "~/utils";

function getAllTodos(): Promise<TodoItem[]> {
  return fetchApi("https://fake.backend/todos");
}

type CheckboxProps = {
  label: string;
  checked: boolean;
  toggleChecked: Function;
  uniqueId: string;
  deleteTodo: Function;
};

function Checkbox({
  label,
  checked,
  toggleChecked,
  uniqueId,
  deleteTodo
}: CheckboxProps) {
  return (
    <div className="flex items-center justify-between gap-8">
      <div
        key={uniqueId}
        className="flex items-center justify-start gap-2">
        <input
          type="checkbox"
          name={`item_${uniqueId}`}
          id={`item_${uniqueId}`}
          checked={checked}
          onChange={e => toggleChecked(e.target.value)}
          value={uniqueId}
        />
        <label
          htmlFor={`item_${uniqueId}`}
          className={`${
            checked ? "line-through" : ""
          } uppercase font-light text-gray-700`}>
          {label}
        </label>
      </div>
      <button
        className="px-2 py-0.5 bg-gray-200 text-red-400 font-extrabold rounded-sm hover:bg-gray-300"
        onClick={() => deleteTodo(uniqueId)}>
        X
      </button>
    </div>
  );
}

function App() {
  let [todos, updateTodos] = React.useState<TodoItem[]>([]);
  let [fetchError, setFetchError] = React.useState<string>("");
  let [fetchingTodos, setFetchingTodos] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!fetchingTodos) {
      return;
    }
    getAllTodos()
      .then(initialTodos => {
        updateTodos(initialTodos);
        if (fetchError.length > 0) {
          setFetchError("");
        }
      })
      .catch((error: Error) => setFetchError(error.message))
      .finally(() => setFetchingTodos(false));
  }, [fetchingTodos]);

  let handleToggle = React.useCallback((id: string): void => {
    updateTodos(
      produce(draft => {
        let todo = draft.find(t => t.id === id);
        if (!todo) return;
        todo.complete = !todo.complete;
      })
    );
  }, []);

  let handleAdd = React.useCallback((evt: React.SyntheticEvent): void => {
    let target = evt.target as typeof evt.target & {
      newTodo: {
        value: string;
      };
    };
    updateTodos(
      produce(draft => {
        draft.push({
          id: uuid4(),
          content: target.newTodo.value,
          complete: false
        });
      })
    );
    evt.preventDefault();
  }, []);

  let handleDelete = (id: string): void =>
    updateTodos(prevValue => prevValue.filter(todo => todo.id !== id));

  let retryFetch = (): void => setFetchingTodos(prev => !prev);

  return (
    <main className="w-full h-full">
      <form
        id="newTodoForm"
        name="newTodoForm"
        onSubmit={handleAdd}
        className="flex flex-col items-start justify-start p-8 bg-gray-200 rounded-lg gap-y-4 min-w-[400px]">
        <div className="flex flex-col items-start justify-start w-full gap-2">
          <label className="tracking-wider uppercase font-extralight">
            What do you want to do?
          </label>
          <input
            className="w-full px-2 py-1 rounded-md"
            type="text"
            name="newTodo"
            id="newTodo"
            required
          />
        </div>
        <button className="self-end px-2 py-1 font-light text-gray-700 uppercase rounded-md bg-emerald-500">
          Add
        </button>
      </form>
      {fetchingTodos ? (
        <div className="flex items-center justify-center mt-8">Loading...</div>
      ) : null}
      {todos.length > 0 ? (
        <div className="flex flex-col gap-2 mt-8">
          {todos.map(({id, content, complete}) => (
            <Checkbox
              key={id}
              uniqueId={id}
              label={content ?? ""}
              checked={complete}
              toggleChecked={handleToggle}
              deleteTodo={handleDelete}
            />
          ))}
        </div>
      ) : null}
      {fetchError.length > 0 ? (
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-2 p-4 mt-8 bg-red-100 rounded-md">
          <pre>{fetchError}</pre>
          <button
            className="px-3 py-2 font-light tracking-wider text-red-600 uppercase bg-gray-300 rounded-sm"
            onClick={retryFetch}
            disabled={fetchingTodos}>
            {fetchingTodos ? "Retrying..." : "Retry"}
          </button>
        </div>
      ) : null}
    </main>
  );
}

export default App;
