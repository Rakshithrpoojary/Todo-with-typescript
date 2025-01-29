import React, { useState } from "react";
import "../App.css";
interface Props {
  todo: string[];
  Edit: (id: number) => void;
  Delete: (id: number) => void;
}
const DisplayTodo: React.FC<Props> = ({ todo, Edit, Delete }) => {
  const [set, reset] = useState<number[]>([]);
  return (
    <div className="display-todo-container">
      {todo.map((todo: string, index: number) => (
        <div key={index} className="display-container">
          <textarea
            readOnly
            style={{
              textDecoration: !set.includes(index) ? "line-through" : "none",
            }}
            value={todo}
          />

          <button onClick={() => Edit(index)}>Edit</button>
          <button onClick={() => Delete(index)}>Delete</button>
          <button
            onClick={() =>
              reset((prev: number[]) =>
                prev.includes(index)
                  ? prev.filter((item) => item != index)
                  : [...prev, index]
              )
            }
          >
            Done
          </button>
        </div>
      ))}
    </div>
  );
};

export default DisplayTodo;
