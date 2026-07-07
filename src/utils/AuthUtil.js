import { useState, useEffect } from 'react';

export function getTokenPayload() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  try {
    const base64Payload = token.split('.')[1];
    return JSON.parse(atob(base64Payload));
  } catch {
    return null;
  }
}

export function getLoggedInUserName() {
  const payload = getTokenPayload();
  if (!payload) return 'User';
  return payload.sub.split('@')[0];
}

export function useUserName() {
  const [userName, setUserName] = useState(getLoggedInUserName());

  useEffect(() => {
    const handleStorage = () => setUserName(getLoggedInUserName());
    window.addEventListener('storage-updated', handleStorage);
    return () => window.removeEventListener('storage-updated', handleStorage);
  }, []);

  return userName;
}