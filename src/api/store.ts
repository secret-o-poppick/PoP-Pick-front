import axios from 'axios';
import { REACT_APP_BACKEND_HOST } from '@/assets/config';
import { StoreType } from '@/types';

const ACCESS_TOKEN = localStorage.getItem('access_token');

const instance = axios.create({
  baseURL: `${REACT_APP_BACKEND_HOST}/api/stores`,
});

// 팝업스토어 목록 정보
export const fetchGetStores = async (parameter?: URLSearchParams) => {
  try {
    let url = '';
    if (parameter) {
      url = `?${parameter.toString()}`;
    }

    const response = await instance.get<StoreType[]>(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

// 팝업스토어 상세 정보
export const fetchGetStore = async (_id: string) => {
  try {
    const response = await instance.get<StoreType>(`/${_id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 팝업스토어 좋아요 업데이트
export const fetchPutStoreLikes = async (_id: string) => {
  try {
    const res = await instance.put<StoreType>(`/${_id}/likes`, null, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return res.data.likes;
  } catch (error) {
    console.error(error);
    return;
  }
};

// 팝업스토어 북마크 업데이트
export const fetchPutStoreBookMarks = async (_id: string) => {
  try {
    await instance.put<StoreType>(`/${_id}/bookmarks`, null, {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });

    return 1;
  } catch (error) {
    console.error(error);
    return;
  }
};
