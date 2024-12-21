import React from 'react';
import { Check, Edit2, Trash2, Play } from 'lucide-react';
import { Task } from '../types';
import { taskStatus } from '../utils/taskStatus';

interface TaskTableProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

export function TaskTable({ tasks, onEdit, onDelete, onStatusChange }: TaskTableProps) {
  const renderStatusButtons = (task: Task) => {
    switch (task.status) {
      case 'completed':
        return null;
      case 'in_progress':
        return (
          <button
            onClick={() => onStatusChange(task.id, 'completed')}
            className="text-green-600 hover:text-green-900"
            title="标记为完成"
          >
            <Check size={18} />
          </button>
        );
      default:
        return (
          <>
            <button
              onClick={() => onStatusChange(task.id, 'in_progress')}
              className="text-blue-600 hover:text-blue-900"
              title="开始处理"
            >
              <Play size={18} />
            </button>
            <button
              onClick={() => onStatusChange(task.id, 'completed')}
              className="text-green-600 hover:text-green-900"
              title="标记为完成"
            >
              <Check size={18} />
            </button>
          </>
        );
    }
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">标题</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">描述</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {tasks.map((task) => (
          <tr key={task.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">{task.title}</div>
            </td>
            <td className="px-6 py-4">
              <div className="text-sm text-gray-500">{task.description}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${taskStatus.getStatusColor(task.status)}`}>
                {taskStatus.getStatusText(task.status)}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
              {renderStatusButtons(task)}
              <button
                onClick={() => onEdit(task)}
                className={`text-blue-600 hover:text-blue-900 ${!taskStatus.canUpdate(task.status) ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="编辑任务"
                disabled={!taskStatus.canUpdate(task.status)}
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className={`text-red-600 hover:text-red-900 ${!taskStatus.canDelete(task.status) ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="删除任务"
                disabled={!taskStatus.canDelete(task.status)}
              >
                <Trash2 size={18} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}