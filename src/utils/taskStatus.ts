import { Task } from '../types';
import toast from 'react-hot-toast';

export const taskStatus = {
  canUpdate: (status: Task['status']): boolean => {
    return status === 'pending';
  },

  canDelete: (status: Task['status']): boolean => {
    return status === 'pending' || status === 'completed';
  },

  getStatusColor: (status: Task['status']): string => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  },

  getStatusText: (status: Task['status']): string => {
    switch (status) {
      case 'completed': return '已完成';
      case 'in_progress': return '进行中';
      default: return '待处理';
    }
  },

  validateStatusChange: (currentStatus: Task['status'], newStatus: Task['status']): boolean => {
    if (currentStatus === 'completed') {
      toast.error('已完成的任务不能更改状态');
      return false;
    }
    if (currentStatus === 'in_progress' && newStatus === 'pending') {
      toast.error('进行中的任务不能返回待处理状态');
      return false;
    }
    return true;
  }
};