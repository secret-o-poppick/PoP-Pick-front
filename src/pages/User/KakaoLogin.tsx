import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';

export default function KakaoLogin() {
  const { login, accessToken } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const KAKAO_CODE = searchParams.get('code');
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    try {
      setAccessTokenFetching(true); // Set fetching to true

      const response = await axios.post(
        'http://localhost:3310/api/auth/kakao',
        {
          authorizationCode: KAKAO_CODE,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const accessToken = response.data.accessToken;

      login(accessToken);

      setAccessTokenFetching(false); // Reset fetching to false
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setAccessTokenFetching(false); // Reset fetching even in case of error
    }
  };

  useEffect(() => {
    if (KAKAO_CODE && !accessToken) {
      getAccessToken();
    }
  }, [KAKAO_CODE, accessToken]);

  return <div>Loading...</div>;
}
