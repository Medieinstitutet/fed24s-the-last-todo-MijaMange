import React, { useState } from 'react';

interface TodoItemProps {
  todo: { id: number; text: string; completed: boolean };
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, removeTodo }) => {
  const [isChecked, setIsChecked] = useState(todo.completed);

  const handleChange = () => {
    setIsChecked(true);
    setTimeout(() => {
      toggleTodo(todo.id);
      setIsChecked(false);
    }, 300);
  };

  return (
    <li className={`todo-item ${todo.completed ? 'done' : ''}`}>
      <label style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <span>{todo.text}</span>
        <input
          type="checkbox"
          checked={todo.completed || isChecked}
          onChange={handleChange}
        />
      </label>
      <button
        className="remove-btn"
        onClick={() => removeTodo(todo.id)}
        title="Ta bort uppgift"
      >
        ✕
      </button>
    </li>
  );
};
