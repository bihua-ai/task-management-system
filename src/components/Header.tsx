import React from 'react';
import { LogOut, ClipboardList, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../lib/auth';

export function Header() {
  const navigate = useNavigate();
  const currentUser = auth.getCurrentUser();

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">我的任务</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-gray-600">
          <User size={20} />
          <span className="text-sm">用户: {currentUser?.username}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
        >
          <LogOut size={20} />
          退出登录
        </button>
      </div>
    </div>
  );
}