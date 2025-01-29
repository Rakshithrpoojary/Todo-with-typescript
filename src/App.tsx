import React, { useState, useRef, useEffect } from "react";
import "../src/App.css";
import DisplayTodo from "./Componenets/DisplayTodo";

const App: React.FC = () => {
  const data = localStorage.getItem("todo");

  const [todo, setTodo] = useState<string[]>(data ? JSON.parse(data) : []);
  const [Editindex, noindex] = useState<number | null>(null);
  const a = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const Submittodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    a.current?.blur();
    if (a.current?.value) {
      const v: string = a.current.value;
      if (Editindex !== null) {
        setTodo((prev) =>
          prev.map((item, index) => (index == Editindex ? v || item : item))
        );
        noindex(null);
      } else {
        setTodo((prev): string[] => [v, ...prev]);
      }
      a.current.value = "";
    }
  };

  const Edit = (id: number) => {
    noindex(id);
    if (a.current) {
      a.current.value = todo[id];
    }
  };

  const Delete = (id: number) => {
    setTodo(todo.filter((todo, index) => index !== id));
  };

  return (
    <div>
      <span>
        <h4>Taskify</h4>
        <form onSubmit={Submittodo}>
          <input
            defaultValue={a.current ? a.current.value : ""}
            ref={a}
            type="text"
            placeholder="Enter a task"
          />
          <button className="add-todo-button" type="submit">
            Go
          </button>
        </form>
        <DisplayTodo todo={todo} Edit={Edit} Delete={Delete} />
      </span>
    </div>
  );
};

export default App;
