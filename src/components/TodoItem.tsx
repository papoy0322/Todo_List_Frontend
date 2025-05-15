import { useState } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Todo, UpdateTodoInput } from '@/types/todo';
import { Edit, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
    todo: Todo;
    onUpdate: (id: number, updates: UpdateTodoInput) => void;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    loading?: boolean;
}

export function TodoItem({
    todo,
    onUpdate,
    onDelete,
    onToggleComplete,
    loading = false
}: TodoItemProps) {
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);
    const [editDescription, setEditDescription] = useState(todo.description || '');

    const handleEdit = () => {
        if (!editTitle.trim()) return;

        onUpdate(todo.id, {
            title: editTitle.trim(),
            description: editDescription.trim() || undefined,
        });
        setEditDialogOpen(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    return (
        <Card className={cn(
            "transition-opacity",
            todo.completed && "opacity-60"
        )}>
            <CardHeader className="pb-3">
                <div className="flex items-start space-x-3">
                    <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() => onToggleComplete(todo.id)}
                        disabled={loading}
                        className="mt-1"
                    />
                    <div className="flex-1 min-w-0">
                        <CardTitle className={cn(
                            "text-base leading-relaxed",
                            todo.completed && "line-through"
                        )}>
                            {todo.title}
                        </CardTitle>
                    </div>
                    <div className="flex space-x-1">
                        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    disabled={loading}
                                    onClick={() => {
                                        setEditTitle(todo.title);
                                        setEditDescription(todo.description || '');
                                    }}
                                >
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit Todo</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                    <Input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        placeholder="Todo title"
                                    />
                                    <Textarea
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        placeholder="Description (optional)"
                                        rows={3}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            onClick={() => setEditDialogOpen(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button onClick={handleEdit}>
                                            Save Changes
                                        </Button>
                                    </div>
                                </div>
                            </DialogContent>
                        </Dialog>
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={loading}
                            onClick={() => onDelete(todo.id)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </CardHeader>
            {todo.description && (
                <CardContent className="pt-0">
                    <CardDescription className={cn(
                        "text-sm",
                        todo.completed && "line-through"
                    )}>
                        {todo.description}
                    </CardDescription>
                </CardContent>
            )}
            <CardContent className="pt-0">
                <p className="text-xs text-muted-foreground">
                    Created {formatDate(todo.createdAt)}
                </p>
            </CardContent>
        </Card>
    );
}