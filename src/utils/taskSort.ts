import { Task } from '../types';

export function sortTasks(tasks: Task[]): Task[] {
  return [...tasks].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });
}