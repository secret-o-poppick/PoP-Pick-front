import axios from 'axios';

export const getLoactionCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_HOST}/api/regionCategories`
    );

    return response.data;
  } catch (e) {
    console.error('Error:', e);
  }
};
