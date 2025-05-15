import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CreateTodoInput } from '@/types/todo';

interface TodoFormProps {
  onSubmit: (todo: CreateTodoInput) => void;
  loading?: boolean;
}

export function TodoForm({ onSubmit, loading = false }: TodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
    });
    
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Input
          type="text"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
          className="text-lg"
        />
      </div>
      <div>
        <Textarea
          placeholder="Add a description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          rows={3}
        />
      </div>
      <Button 
        type="submit" 
        disabled={!title.trim() || loading}
        className="w-full"
      >
        {loading ? 'Adding...' : 'Add Todo'}
      </Button>
    </form>
  );
}