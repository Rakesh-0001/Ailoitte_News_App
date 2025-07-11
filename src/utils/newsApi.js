import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
const BASE_URL = 'https://newsapi.org/v2';


export const getTopHeadlines = async (country = 'us') => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=dfd4016b79bd4c269908e43cb57a8e87`);
    console.log("API Response:", response);
    console.log("Response Data:", response.data);
    return response.data;
  } catch (error) {
    console.error('Full error:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};


export const getNewsByCategory = async (category, page = 1, pageSize = 8) => {
  try {
    const response = await axios.get(`${BASE_URL}/top-headlines`, {
      params: {
        category,
        pageSize,
        page,
        apiKey: API_KEY
      }
    });   
    console.log("getNewsByCategory","MY-Category-Name-",category,response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching news by category:', error);
    throw error;
  }
};

export const searchNews = async (query, page = 1, pageSize = 8) => {
  try {
    const response = await axios.get(`${BASE_URL}/everything`, {
      params: {
        q: query,
        pageSize,
        page,
        apiKey: API_KEY
      }
    });
    console.log("searchNews",response.data);

    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};




