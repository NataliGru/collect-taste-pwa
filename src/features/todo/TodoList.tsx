'use client';
import { useEffect, useState } from 'react';

import {
  Todo,
  addTodo,
  deleteTodo,
  getTodos,
  updateTodo,
} from '@/shared/lib/indexDB/db';
import { syncTodos } from '@/shared/lib/indexDB/sync';

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    loadTodos();
  }, []);

  async function loadTodos() {
    const allTodos = await getTodos();
    setTodos(allTodos.sort((a, b) => b.createdAt - a.createdAt));
  }

  async function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const todo = await addTodo(newTodo.trim());
    setTodos([todo, ...todos]);
    setNewTodo('');
    // try to sync immediately
    syncTodos();
  }

  async function handleToggle(id: string) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    await updateTodo(id, { completed: !todo.completed });
    setTodos(
      todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
    syncTodos();
  }

  async function handleDelete(id: string) {
    await deleteTodo(id);
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1>Offline Todos</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type='text'
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='What needs to be done?'
        />
        <button type='submit'>Add</button>
      </form>
      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <input
              type='checkbox'
              checked={todo.completed}
              onChange={() => handleToggle(todo.id)}
            />
            <span>{todo.text}</span>
            {!todo.synced && <span>Pending...</span>}
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
