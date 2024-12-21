import { ValidationRules, inputRules } from '../types/validation';

export function validateInput(value: string, rule: ValidationRules): string | null {
  if (value.length < rule.minLength || value.length > rule.maxLength) {
    return rule.errorMessage;
  }
  
  if (rule.pattern && !rule.pattern.test(value)) {
    return rule.errorMessage;
  }

  return null;
}

export function validateUsername(username: string): string | null {
  return validateInput(username, inputRules.username);
}

export function validatePassword(password: string): string | null {
  return validateInput(password, inputRules.password);
}

export function validateTaskTitle(title: string): string | null {
  return validateInput(title, inputRules.taskTitle);
}

export function validateTaskDescription(description: string): string | null {
  return validateInput(description, inputRules.taskDescription);
}