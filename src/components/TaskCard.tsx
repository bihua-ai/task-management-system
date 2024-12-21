import React from 'react';
import { Pencil, Trash2, CheckCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[task.status]}`}>
          {task.status.replace('_', ' ')}
        </span>
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onStatusChange(task.id, 'completed')}
          className="p-2 text-green-600 hover:bg-green-50 rounded-full"
          title="Mark as completed"
        >
          <CheckCircle size={20} />
        </button>
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
          title="Edit task"
        >
          <Pencil size={20} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
          title="Delete task"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}