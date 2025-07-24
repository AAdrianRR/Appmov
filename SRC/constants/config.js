import { Platform } from 'react-native';

const API_PORT = '3000';

export const API_BASE =
  Platform.OS === 'web'
    ? `http://localhost:${API_PORT}`
    : `http://192.168.1.79:${API_PORT}`;
