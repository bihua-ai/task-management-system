import { storage } from './storage';
import type { User, AuthError } from '../types/auth';

interface AuthResponse {
  user?: User;
  error?: AuthError;
}

export const auth = {
  login: (username: string, password: string): AuthResponse => {
    const users = storage.getItem('users') || [];
    
    // Check if user exists
    const userExists = users.some((u: User & { password: string }) => u.username === username);
    if (!userExists) {
      return { error: { message: '用户未注册，请先创建账号' } };
    }
    
    // Check credentials
    const user = users.find((u: User & { password: string }) => 
      u.username === username && u.password === password
    );
    
    if (!user) {
      return { error: { message: '密码错误' } };
    }
    
    const userInfo: User = { id: user.id, username: user.username };
    storage.setItem('currentUser', userInfo);
    return { user: userInfo };
  },

  register: (username: string, password: string): AuthResponse => {
    if (!username || !password) {
      return { error: { message: '用户名和密码不能为空' } };
    }

    const users = storage.getItem('users') || [];
    if (users.some((u: User) => u.username === username)) {
      return { error: { message: '用户名已存在' } };
    }

    const newUser = { 
      id: crypto.randomUUID(), 
      username, 
      password 
    };
    
    users.push(newUser);
    storage.setItem('users', users);
    return {};
  },

  getCurrentUser: (): User | null => storage.getItem('currentUser'),

  logout: () => {
    localStorage.removeItem('currentUser');
  }
};