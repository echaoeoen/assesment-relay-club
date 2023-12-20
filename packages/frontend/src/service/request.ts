import axios from 'axios';
import { useState } from 'react';

export const useRequest = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const client = axios.create({
    baseURL: (process.env.REACT_APP_API_URL || '') + '/api',
  });
  client.interceptors.request.use((config) => {
    setLoading(true);
    return config;
  });
  client.interceptors.response.use(
    (response) => {
      setLoading(false);
      return response;
    },
    (error) => {
      setLoading(false);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong');
      }
      return Promise.reject(error);
    },
  );
  return { client, loading, errorMessage };
};
