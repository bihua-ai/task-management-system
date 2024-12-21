import { Task } from '../types';
import { tasks } from '../lib/tasks';
import { taskStatus } from '../utils/taskStatus';
import { sortTasks } from '../utils/taskSort';
import toast from 'react-hot-toast';

interface TaskOperationsProps {
  taskList: Task[];
  editingTask: Task | null;
  title: string;
  description: string;
  setTaskList: (tasks: Task[]) => void;
  setIsEditing: (isEditing: boolean) => void;
  setEditingTask: (task: Task | null) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}

export function useTaskOperations({
  taskList,
  editingTask,
  title,
  description,
  setTaskList,
  setIsEditing,
  setEditingTask,
  setTitle,
  setDescription
}: TaskOperationsProps) {
  const fetchTasks = () => {
    const allTasks = tasks.getAll();
    setTaskList(sortTasks(allTasks));
  };

  const handleEdit = (task: Task) => {
    if (!taskStatus.canUpdate(task.status)) {
      toast.error(
        task.status === 'in_progress' 
          ? '进行中的任务不能编辑' 
          : '已完成的任务不能编辑'
      );
      return;
    }
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    const task = taskList.find(t => t.id === id);
    if (!task) return;

    if (!taskStatus.canDelete(task.status)) {
      toast.error('进行中的任务不能删除');
      return;
    }
    
    tasks.delete(id);
    toast.success('任务删除成功');
    fetchTasks();
  };

  const handleStatusChange = (id: string, newStatus: Task['status']) => {
    const task = taskList.find(t => t.id === id);
    if (!task) return;

    if (!taskStatus.validateStatusChange(task.status, newStatus)) {
      return;
    }

    const { error } = tasks.update(id, { status: newStatus });
    if (error) {
      toast.error('更新任务状态失败');
      return;
    }
    toast.success('任务状态更新成功');
    fetchTasks();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingTask) {
      const { error } = tasks.update(editingTask.id, { title, description });
      if (error) {
        toast.error('更新任务失败');
        return;
      }
      toast.success('任务更新成功');
    } else {
      const { error } = tasks.create({ title, description });
      if (error) {
        toast.error('创建任务失败');
        return;
      }
      toast.success('任务创建成功');
    }

    setTitle('');
    setDescription('');
    setIsEditing(false);
    setEditingTask(null);
    fetchTasks();
  };

  return {
    handleEdit,
    handleDelete,
    handleStatusChange,
    handleSubmit
  };
}