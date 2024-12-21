import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { tasks } from '../lib/tasks';
import { Task } from '../types';
import { Header } from '../components/Header';
import { Pagination } from '../components/Pagination';
import { TaskForm } from '../components/TaskForm';
import { TaskTable } from '../components/TaskTable';
import { useTaskOperations } from '../hooks/useTaskOperations';
import { sortTasks } from '../utils/taskSort';
import toast from 'react-hot-toast';

const ITEMS_PER_PAGE = 5;

export function TaskList() {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const { handleEdit, handleDelete, handleStatusChange, handleSubmit } = useTaskOperations({
    taskList,
    editingTask,
    title,
    description,
    setTaskList,
    setIsEditing,
    setEditingTask,
    setTitle,
    setDescription
  });

  useEffect(() => {
    const allTasks = tasks.getAll();
    setTaskList(sortTasks(allTasks));
  }, []);

  // Calculate pagination values
  const totalPages = Math.ceil(taskList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTasks = taskList.slice(startIndex, endIndex);

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTask(null);
    setTitle('');
    setDescription('');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Header />
      <div className="flex justify-end mb-8">
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          添加任务
        </button>
      </div>

      {isEditing && (
        <TaskForm
          title={title}
          description={description}
          isEditing={!!editingTask}
          onTitleChange={setTitle}
          onDescriptionChange={setDescription}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <TaskTable
          tasks={currentTasks}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onStatusChange={handleStatusChange}
        />
        {taskList.length > ITEMS_PER_PAGE && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}