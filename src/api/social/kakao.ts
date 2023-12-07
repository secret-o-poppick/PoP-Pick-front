import axios from 'axios';
import { REACT_APP_BACKEND_HOST } from '@/assets/config';

const ACCESS_TOKEN = localStorage.getItem('access_token');

const instance = axios.create({
  baseURL: `${REACT_APP_BACKEND_HOST}/api/auth/kakao`,
});

// 카카오 로그인 페이지 주소
export const fetchGetKakaoLoginPath = async () => {
  try {
    const response = await instance.get<{ path: string }>(`/login`);

    return response.data.path;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 카카오 로그인
export const fetchKakaoLogin = async (code: string) => {
  try {
    const response = await instance.post(
      `/`,
      {
        authorizationCode: code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// 카카오 로그아웃
export const fetchKakaoLogout = async () => {
  try {
    const response = await instance.post(`/logout`, null, {
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

// 카카오 회원탈퇴
export const fetchKakaoWithdrawal = async () => {
  try {
    const response = await instance.post(`/withdrawal`, null, {
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
