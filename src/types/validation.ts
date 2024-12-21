export interface ValidationRules {
  minLength: number;
  maxLength: number;
  pattern?: RegExp;
  errorMessage: string;
}

export const inputRules = {
  username: {
    minLength: 3,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
    errorMessage: '用户名长度为3-20个字符，只能包含字母、数字、下划线和中文'
  },
  password: {
    minLength: 6,
    maxLength: 20,
    pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
    errorMessage: '密码长度为6-20个字符，只能包含字母、数字和特殊字符'
  },
  taskTitle: {
    minLength: 2,
    maxLength: 50,
    pattern: /^[a-zA-Z0-9\s\u4e00-\u9fa5,.!?，。！？]+$/,
    errorMessage: '标题长度为2-50个字符，可以包含中英文、数字和标点符号'
  },
  taskDescription: {
    minLength: 0,
    maxLength: 200,
    errorMessage: '描述最多200个字符'
  }
} as const;