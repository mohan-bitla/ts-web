import client from './client';

export const getReservations = async (params = {}) => {
  try {
    const response = await client.get('/reservations', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching reservations:', error);
    throw error;
  }
};
