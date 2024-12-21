import React from 'react';
import { validateTaskTitle, validateTaskDescription } from '../utils/validation';
import toast from 'react-hot-toast';

interface TaskFormProps {
  title: string;
  description: string;
  isEditing: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export function TaskForm({
  title,
  description,
  isEditing,
  onTitleChange,
  onDescriptionChange,
  onSubmit,
  onCancel
}: TaskFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Only validate on form submission
    const titleError = validateTaskTitle(title);
    if (titleError) {
      toast.error(titleError);
      return;
    }
    
    // Only proceed to validate description if title is valid
    const descError = validateTaskDescription(description);
    if (descError) {
      toast.error(descError);
      return;
    }
    
    onSubmit(e);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">任务标题</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">任务描述</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md border border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isEditing ? '更新任务' : '创建任务'}
        </button>
      </div>
    </form>
  );
}