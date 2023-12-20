import { useRequest } from './request';

export const useAuth = () => {
  const { client, loading, errorMessage } = useRequest();
  const login = (username: string, password: string) => {
    return client.post('/login', { username, password });
  };
  const logout = () => {
    return client.delete('/logout');
  };
  const register = (name: string, username: string, password: string) => {
    return client.post('/users', { name, username, password });
  };
  const getProfile = () => {
    return client.get('/users/me');
  };
  return {
    errorMessage,
    getProfile,
    login,
    register,
    loading,
    logout,
  };
};
