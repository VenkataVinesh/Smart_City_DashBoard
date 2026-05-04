import axios from 'axios';
import { io } from 'socket.io-client';

const API_URL = 'http://localhost:5000/api';
const SOCKET_URL = 'http://localhost:5000';

export const fetchLatestCityData = async () => {
  try {
    const response = await axios.get(`${API_URL}/cities`);
    return response.data;
  } catch (error) {
    console.error('Error fetching city data:', error);
    return [];
  }
};

export const initSocket = (onUpdate) => {
  const socket = io(SOCKET_URL);
  
  socket.on('city_update', (data) => {
    onUpdate(data);
  });

  return socket;
};
