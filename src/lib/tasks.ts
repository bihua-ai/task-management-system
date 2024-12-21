import { storage } from './storage';
import { auth } from './auth';
import { Task } from '../types';

export const tasks = {
  getAll: () => {
    const user = auth.getCurrentUser();
    if (!user) return [];
    return (storage.getItem('tasks') || [])
      .filter((task: Task) => task.user_id === user.id);
  },

  create: (data: Pick<Task, 'title' | 'description'>) => {
    const user = auth.getCurrentUser();
    if (!user) return { error: 'Not authenticated' };

    const tasks = storage.getItem('tasks') || [];
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: 'pending',
      user_id: user.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    tasks.push(newTask);
    storage.setItem('tasks', tasks);
    return { task: newTask, error: null };
  },

  update: (id: string, data: Partial<Task>) => {
    const tasks = storage.getItem('tasks') || [];
    const index = tasks.findIndex((t: Task) => t.id === id);
    if (index === -1) return { error: 'Task not found' };

    tasks[index] = {
      ...tasks[index],
      ...data,
      updated_at: new Date().toISOString()
    };
    
    storage.setItem('tasks', tasks);
    return { task: tasks[index], error: null };
  },

  delete: (id: string) => {
    const tasks = storage.getItem('tasks') || [];
    const filtered = tasks.filter((t: Task) => t.id !== id);
    storage.setItem('tasks', filtered);
  }
};