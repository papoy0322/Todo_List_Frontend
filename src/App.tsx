import { useEffect } from 'react';
import { useTodoStore } from './store/todoStore';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { CheckSquare } from 'lucide-react';

function App() {
  const { 
    todos, 
    loading, 
    error, 
    fetchTodos, 
    createTodo, 
    updateTodo, 
    deleteTodo, 
    toggleComplete 
  } = useTodoStore();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <CheckSquare className="h-8 w-8 mr-3 text-primary" />
            <h1 className="text-4xl font-bold">Todo App</h1>
          </div>
          <p className="text-muted-foreground">
            Stay organized with your tasks
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <Card className="mb-6 border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive text-center">{error}</p>
            </CardContent>
          </Card>
        )}

        {/* Add Todo Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Add New Todo</CardTitle>
          </CardHeader>
          <CardContent>
            <TodoForm 
              onSubmit={createTodo} 
              loading={loading}
            />
          </CardContent>
        </Card>

        {/* Todo List */}
        <TodoList
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;