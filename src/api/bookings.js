import client from './client';

export const loadCities = async (params = {}) => {
  try {
    const response = await client.get('/load-cities/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};