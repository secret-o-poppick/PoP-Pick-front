import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { REACT_APP_BACKEND_HOST } from '@/assets/config';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const getUserInfo = useCallback(async () => {
    if (!isLoggedIn) return;

    try {
      if (accessToken) {
        const response = await axios.get(
          `${REACT_APP_BACKEND_HOST}/api/users`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.data.id_token) {
          localStorage.setItem('access_token', response.data.id_token);
        }
        setUser(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }, [isLoggedIn, accessToken]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    const fetchData = async () => {
      if (token) {
        setLoggedIn(true);
        setAccessToken(token);
        await getUserInfo();
      }
    };

    fetchData();
  }, [getUserInfo]);

  const login = async (accessToken: string) => {
    setAccessToken(accessToken);
    setLoggedIn(true);
    await getUserInfo();

    localStorage.setItem('access_token', accessToken);
  };

  const logout = async () => {
    try {
      const response = await axios.post(
        `${REACT_APP_BACKEND_HOST}/api/auth/kakao/logout`,
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response) {
        console.log('로그아웃 성공');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setAccessToken(null);
      setLoggedIn(false);
      setUser(null);

      localStorage.removeItem('access_token');
    }
  };

  const withdrawal = async () => {
    if (accessToken) {
      try {
        const response = await axios.post(
          `${REACT_APP_BACKEND_HOST}/api/auth/kakao/withdrawal`,
          null,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (response) {
          setAccessToken(null);
          setLoggedIn(false);
          setUser(null);

          localStorage.removeItem('access_token');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        accessToken,
        user,
        login,
        logout,
        withdrawal,
        getUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('에러입니다!!');
  }

  return context;
};
