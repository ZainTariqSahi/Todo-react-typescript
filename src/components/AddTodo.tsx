import { FormEvent, useEffect, useState } from "react";
import Nav from "./Nav";
import { useSearchParams } from "react-router-dom";

const AddTodo = () => {
  const [toDoInput, setToDoInput] = useState("");
  const [toDo, setToDo] = useState<toDoObjectType[]>([]);
  const [originalTodos, setOriginalTodos] = useState<toDoObjectType[]>(() => {
    const storedData = localStorage.getItem('originalTodos');
    return storedData ? JSON.parse(storedData) : [];
  });
    

  const [searchParams] = useSearchParams();

  type toDoObjectType = {
    id: string;
    task: string;
    completed: boolean;
    createdAt: Date;
  };

  const handleAddToDo = (toDoInput: string) => {
    const newTodo: toDoObjectType = {
      id: Math.random().toString(),
      task: toDoInput,
      completed: false,
      createdAt: new Date(),
    };

    setToDo((prev) => [newTodo, ...prev]);
    setOriginalTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodoCompleted = (id: string) => {
    setToDo((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    setOriginalTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id: string) => {
    setToDo((prev) => prev.filter((todo) => todo.id !== id));
    setOriginalTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    // Update localStorage whenever originalTodos changes
    localStorage.setItem('originalTodos', JSON.stringify(originalTodos));
  }, [originalTodos]);

  useEffect(() => {
    let todosData = searchParams.get("todos");

    if (todosData === "active") {
      setToDo(originalTodos.filter((item) => !item.completed));
    } else if (todosData === "completed") {
      setToDo(originalTodos.filter((item) => item.completed));
    } else {
      setToDo(originalTodos);
    }
  }, [searchParams, originalTodos]);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddToDo(toDoInput);
    setToDoInput("");
  };

  return (
    <>
      <Nav />
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={toDoInput}
          onChange={(e) => setToDoInput(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {toDo?.map((item) => (
          <li key={item?.id}>
            <input
              type="checkbox"
              id={`todo-${item?.id}`}
              checked={item?.completed}
              onChange={() => toggleTodoCompleted(item?.id)}
            />
            <label htmlFor={`todo-${item?.id}`}>{item?.task}</label>
            {item?.completed && (
              <button type="button" onClick={() => handleDeleteTodo(item?.id)}>
                Delete
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default AddTodo;
