import { useState } from 'react';
import { TodoItem } from './TodoItem';
import { Button } from '@/components/ui/button';
import { Todo, UpdateTodoInput } from '@/types/todo';

interface TodoListProps {
    todos: Todo[];
    onUpdate: (id: number, updates: UpdateTodoInput) => void;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    loading?: boolean;
}

type FilterType = 'all' | 'active' | 'completed';

export function TodoList({
    todos,
    onUpdate,
    onDelete,
    onToggleComplete,
    loading = false
}: TodoListProps) {
    const [filter, setFilter] = useState<FilterType>('all');

    const filteredTodos = todos.filter(todo => {
        switch (filter) {
            case 'active':
                return !todo.completed;
            case 'completed':
                return todo.completed;
            default:
                return true;
        }
    });

    const completedCount = todos.filter(todo => todo.completed).length;
    const activeCount = todos.length - completedCount;

    return (
        <div className="space-y-4">
            {/* Filter Buttons */}
            <div className="flex space-x-2 justify-center">
                <Button
                    variant={filter === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('all')}
                >
                    All ({todos.length})
                </Button>
                <Button
                    variant={filter === 'active' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('active')}
                >
                    Active ({activeCount})
                </Button>
                <Button
                    variant={filter === 'completed' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilter('completed')}
                >
                    Completed ({completedCount})
                </Button>
            </div>

            {/* Todo Items */}
            <div className="space-y-3">
                {filteredTodos.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                        {filter === 'all'
                            ? "No todos yet. Add one above!"
                            : filter === 'active'
                                ? "No active todos."
                                : "No completed todos."
                        }
                    </div>
                ) : (
                    filteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                            onToggleComplete={onToggleComplete}
                            loading={loading}
                        />
                    ))
                )}
            </div>
        </div>
    );
}