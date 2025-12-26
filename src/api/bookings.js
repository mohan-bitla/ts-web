import client from './client';

export const loadCities = async (params = {}) => {
  try {
    const response = await client.get('/meta-data/cities', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const loadRoutes = async (params = {}) => {
  try {
    const response = await client.get('/meta-data/routes', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching routes:', error);
    throw error;
  }
};