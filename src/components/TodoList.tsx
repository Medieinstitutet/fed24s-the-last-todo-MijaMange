import React from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import { TodoItem } from './TodoItem';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  todos: Todo[];
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void; 
  droppableId: string;
}

export const TodoList: React.FC<Props> = ({ todos, toggleTodo, removeTodo, droppableId }) => {
  return (
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <ul
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ minHeight: '50px' }}
        >
          {todos.map((todo, index) => (
            <Draggable key={todo.id.toString()} draggableId={todo.id.toString()} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TodoItem
                    todo={todo}
                    toggleTodo={toggleTodo}
                    removeTodo={removeTodo} 
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
