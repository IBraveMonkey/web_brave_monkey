// General utilities
export const noop = (): void => {};

export const identity = <T>(x: T): T => x;

export const isDefined = <T>(x: T | undefined | null): x is T => {
  return x !== undefined && x !== null;
};

export const isString = (x: unknown): x is string => {
  return typeof x === 'string';
};

export const isNumber = (x: unknown): x is number => {
  return typeof x === 'number';
};

export const isBoolean = (x: unknown): x is boolean => {
  return typeof x === 'boolean';
};

export const isFunction = (x: unknown): x is Function => {
  return typeof x === 'function';
};

export const isObject = (x: unknown): x is object => {
  return x !== null && typeof x === 'object' && !Array.isArray(x);
};

export const isArray = (x: unknown): x is any[] => {
  return Array.isArray(x);
};

// DOM utilities
export const scrollToTop = (): void => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const scrollToElement = (selector: string): void => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Storage utilities
export const setLocalStorage = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error getting from localStorage:', error);
    return defaultValue;
  }
};

export const removeLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

// Event utilities
export const preventDefault = (e: Event): void => {
  e.preventDefault();
};

export const stopPropagation = (e: Event): void => {
  e.stopPropagation();
};