import axios from 'axios';
import { REACT_APP_BACKEND_HOST } from '@/assets/config';
import { StoreType, User } from '@/types';

const ACCESS_TOKEN = localStorage.getItem('access_token');

const instance = axios.create({
  baseURL: `${REACT_APP_BACKEND_HOST}/api/users`,
});

// 유저정보
export const fetchGetUser = async () => {
  try {
    const response = await instance.get<User>(`/`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 유저 좋아요 목록 정보
export const fetchGetUserLikes = async () => {
  try {
    const response = await instance.get<StoreType[]>(`/likes`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 유저 북마크 목록 정보
export const fetchGetUserBookMarks = async () => {
  try {
    const response = await instance.get<StoreType[]>(`/bookmarks`, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
