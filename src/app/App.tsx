import produce from "immer";
import * as React from "react";
import {v4 as uuid4} from "uuid";
import {fetchApi} from "~/utils";

async function getAllTodos() {
  const url = "https://fake.backend/todos";
  return await fetchApi(url);
}

function Checkbox({label, checked, toggleChecked, uniqueId}) {
  return (
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
  );
}

function App() {
  let [todos, updateTodos] = React.useState([]);
  let [fetchingTodos, setFetchingTodos] = React.useState(true);

  React.useEffect(() => {
    if (!fetchingTodos) {
      return;
    }
    (async function () {
      try {
        let todosFromApi = await getAllTodos();
        if (todosFromApi) {
          updateTodos(todosFromApi);
        }
      } catch (e) {
        alert(e);
      } finally {
        setFetchingTodos(false);
      }
    })();
  }, [fetchingTodos]);

  let handleToggle = React.useCallback(id => {
    updateTodos(
      produce(draft => {
        let todo = draft.find(t => t.id === id);
        todo.complete = !todo.complete;
      })
    );
  }, []);

  let handleAdd = React.useCallback(evt => {
    updateTodos(
      produce(draft => {
        draft.push({
          id: uuid4(),
          content: evt.target["newTodo"].value,
          complete: false
        });
      })
    );
    evt.preventDefault();
  }, []);

  return (
    <main className="w-full h-full">
      <form
        id="newTodoForm"
        name="newTodoForm"
        onSubmit={handleAdd}
        className="flex flex-col items-start justify-start gap-4 p-8 bg-gray-200 rounded-lg">
        <div className="flex flex-col items-start justify-start gap-2">
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
        <button className="self-end px-2 py-1 font-light text-gray-600 uppercase rounded-md bg-emerald-500">
          Add
        </button>
      </form>
      <div className="flex flex-col gap-2 mt-8">
        {todos.map(({id, content, complete}) => (
          <Checkbox
            key={id}
            uniqueId={id}
            label={content}
            checked={complete}
            toggleChecked={handleToggle}
          />
        ))}
      </div>
    </main>
  );
}

export default App;
