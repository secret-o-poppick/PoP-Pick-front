import axios from 'axios';
import { REACT_APP_BACKEND_HOST } from '@/assets/config';
import { LocationCategory } from '@/types';

const instance = axios.create({
  baseURL: `${REACT_APP_BACKEND_HOST}/api/regionCategories`,
});

// 지역 카테고리 목록 조회하기
export const fetchGetLocationCategories = async () => {
  try {
    const response = await instance.get<LocationCategory[]>(`/`);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 지역 카테고리 상세 조회하기
export const fetchGetLocationCategory = async (_id: string) => {
  try {
    const response = await instance.get<LocationCategory>(`/${_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
