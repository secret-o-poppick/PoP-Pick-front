import axios from 'axios';
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';

interface User {
  _id: string;
  name: string;
  nickName: string;
  role: string;
  image: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  withdrawal: () => void;
}

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
      console.log('getUserInfo 호출');
      if (accessToken) {
        const response = await axios.get('http://localhost:3310/api/users', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setUser(response.data); // Assuming the response data is the user object
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

  const login = (accessToken: string) => {
    setAccessToken(accessToken);
    setLoggedIn(true);
    getUserInfo();

    localStorage.setItem('access_token', accessToken);
  };

  const logout = () => {
    setAccessToken(null);
    setLoggedIn(false);
    setUser(null);

    localStorage.removeItem('access_token');
  };

  const withdrawal = async () => {
    if (accessToken) {
      const response = await axios.post(
        'http://localhost:3310/api/auth/kakao/withdrawal',
        null,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log(response);
      if (response) logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, accessToken, user, login, logout, withdrawal }}
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