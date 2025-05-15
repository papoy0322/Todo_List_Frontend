import { create } from 'zustand';
import { Todo, CreateTodoInput, UpdateTodoInput } from '../types/todo';

interface TodoStore {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  
  // Actions
  fetchTodos: () => Promise<void>;
  createTodo: (todo: CreateTodoInput) => Promise<void>;
  updateTodo: (id: number, updates: UpdateTodoInput) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  toggleComplete: (id: number) => Promise<void>;
}

const API_BASE_URL = '/api';

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  loading: false,
  error: null,

  fetchTodos: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/todos`);
      if (!response.ok) throw new Error('Failed to fetch todos');
      const todos = await response.json();
      set({ todos, loading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
    }
  },

  createTodo: async (todo: CreateTodoInput) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      if (!response.ok) throw new Error('Failed to create todo');
      const newTodo = await response.json();
      set(state => ({ 
        todos: [newTodo, ...state.todos], 
        loading: false 
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
    }
  },

  updateTodo: async (id: number, updates: UpdateTodoInput) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (!response.ok) throw new Error('Failed to update todo');
      const updatedTodo = await response.json();
      set(state => ({
        todos: state.todos.map(todo => 
          todo.id === id ? updatedTodo : todo
        ),
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
    }
  },

  deleteTodo: async (id: number) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete todo');
      set(state => ({
        todos: state.todos.filter(todo => todo.id !== id),
        loading: false
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Unknown error', loading: false });
    }
  },

  toggleComplete: async (id: number) => {
    const { todos, updateTodo } = get();
    const todo = todos.find(t => t.id === id);
    if (todo) {
      await updateTodo(id, { completed: !todo.completed });
    }
  },
}));