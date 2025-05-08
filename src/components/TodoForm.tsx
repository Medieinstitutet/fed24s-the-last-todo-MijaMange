import React, { useState } from 'react';

interface Props {
  addTodo: (text: string) => void;
}

export const TodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New todo"
        type="text"
      />
      <button type="submit">Add task</button>
    </form>
  );
};
