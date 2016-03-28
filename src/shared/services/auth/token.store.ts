export const persistToken = (key: string, token: string) => localStorage.setItem(key, token);

export const getToken = (key: string) => localStorage.getItem(key);
