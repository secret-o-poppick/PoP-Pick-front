import axios from 'axios';
import { REACT_APP_BACKEND_HOST } from '@/assets/config';
import { Category } from '@/types';

const instance = axios.create({
  baseURL: `${REACT_APP_BACKEND_HOST}/api/categories`,
});

// 카테고리 목록 조회하기
export const fetchGetCategories = async () => {
  try {
    const response = await instance.get<Category[]>(`/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 카테고리 상세 조회하기
export const fetchGetCategory = async (_id: string) => {
  try {
    const response = await instance.get<Category>(`/${_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
