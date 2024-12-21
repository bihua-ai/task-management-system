export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed';
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface User {
  id: string;
  email: string;
}