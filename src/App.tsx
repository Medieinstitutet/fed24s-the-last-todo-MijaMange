// App.tsx
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm';
import './App.css';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import logo from './img/logo.png';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const LOCAL_STORAGE_KEY = 'hiking-todos';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [sortOrder, setSortOrder] = useState<'az' | 'za'>('az');

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    try {
      const parsed = saved ? JSON.parse(saved) : [];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setTodos(parsed);
      } else {
        throw new Error();
      }
    } catch {
      setTodos([
        { id: 1, text: 'Pack tent', completed: false },
        { id: 2, text: 'Fill water bottles', completed: false },
        { id: 3, text: 'Charge power bank', completed: false },
        { id: 4, text: 'Prepare food & snacks', completed: false },
        { id: 5, text: 'Check the weather forecast', completed: false },
        { id: 6, text: 'Print hiking map', completed: false },
        { id: 7, text: 'Bring first aid kit', completed: true },
      ]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const sortedTodos = [...todos].sort((a, b) =>
    sortOrder === 'az' ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text)
  );

  const activeTodos = sortedTodos.filter(t => !t.completed);
  const completedTodos = sortedTodos.filter(t => t.completed);

  const toggleTodo = (id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const updated = Array.from(todos);
    const [moved] = updated.splice(source.index, 1);
    updated.splice(destination.index, 0, moved);

    setTodos(updated);
  };

  const markAllDone = () => {
    setTodos(todos.map(t => ({ ...t, completed: true })));
  };

  const undoAllTasks = () => {
    setTodos(todos.map(t => ({ ...t, completed: false })));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <button className="print-btn" onClick={() => window.print()}>Export / Print</button>

      <div className="todo-wrapper">
        <img src={logo} alt="Hiking Checklist logo" style={{ width: '120px', margin: '0 auto 10px', display: 'block' }} />
        <h1>My Hiking Checklist</h1>
        <p className="intro-text">
          Plan your perfect hike by organizing all your essentials.
          Add tasks, mark them as done, drag to sort, and export your list.
          Stay prepared and enjoy the trail!
        </p>

        <TodoForm addTodo={addTodo} />

        <div className="sort">
          <label>Sort: </label>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as 'az' | 'za')}>
            <option value="az">A–Z</option>
            <option value="za">Z–A</option>
          </select>
        </div>

        <div className="todo-list">
          <h2>To do</h2>
          <TodoList todos={activeTodos} toggleTodo={toggleTodo} removeTodo={removeTodo} droppableId="active" />
          {activeTodos.length > 0 && (
            <div className="center-btn">
              <button className="mark-all" onClick={markAllDone}>Mark all as done</button>
            </div>
          )}
          <p className="items-left">{activeTodos.length} tasks left</p>

          <h2>Done</h2>
          <TodoList todos={completedTodos} toggleTodo={toggleTodo} removeTodo={removeTodo} droppableId="done" />
          {completedTodos.length > 0 && (
            <div className="center-btn">
              <button className="undo-all" onClick={undoAllTasks}>Undo all tasks</button>
            </div>
          )}
        </div>

       
        <footer className="footer">
          <p>Made with ☕ & 🌲 by Mija</p>
        </footer>
      </div>
    </DragDropContext>
  );
}

export default App;
