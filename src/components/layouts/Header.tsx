
import styled from "styled-components";
import { useEffect, useState } from "react";
import SearchPage from "./SearchPage";
import { Link, useLocation } from "react-router-dom";
import { DateRange } from "react-day-picker";

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// icons
import logoImg from '@/assets/logo.svg';
import logoTitleImg from '@/assets/logotitle.png';
import { IoLogOutOutline } from 'react-icons/io5';
import { FaRegCircleUser } from 'react-icons/fa6';
import { FaSearch } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { MEDIA_LIMIT } from '@/assets/styleVariable';
import LoginModal from '../LoginModal';
import { useAuth } from '@/context/AuthContext';
import Avatar from '../Avatar';

export default function Header() {
  const { isLoggedIn, logout, user } = useAuth();
  const [isSearchOpened, setSearchOpened] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>("");

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const location = useLocation();

  const stringBtnHandler = () => {
    setSearchOpened(true);
    setSearchType('string');
  };
  const locationBtnHandler = () => {
    setSearchOpened(true);
    setSearchType('location');
  };
  const dateBtnHandler = () => {
    setSearchOpened(true);
    setSearchType('date');
  };

  const handleLoginButtonClick = () => {
    withReactContent(Swal).fire({
      html: <LoginModal />,
      showConfirmButton: false,
    });
  };

  useEffect(() => {
    setSearchOpened(false);
  }, [location]);

  return (
    <>
      <SearchPage
        setSearchOpened={setSearchOpened}
        isSearchOpened={isSearchOpened}
        searchType={searchType}
        locationBtnHandler={locationBtnHandler}
        dateBtnHandler={dateBtnHandler}
        stringBtnHandler={stringBtnHandler}
      />

      <StyledHeader>
        <StyledLink to='/'>
          <img className='logo' src={logoImg} alt='logo' />
          <img className='logoTitle' src={logoTitleImg} alt='logo' />
        </StyledLink>

        <StyledSearch>
          <div>
            <input
              placeholder='✨Pick 하고 싶은 이벤트 찾기!✨'
              onClick={stringBtnHandler}
            />
            <button className='optBtns' onClick={locationBtnHandler}>
              <MdLocationPin />
              <div>위치</div>
            </button>
            <button className='optBtns' onClick={dateBtnHandler}>
              <FaRegCalendarCheck />
              <div>기간</div>
            </button>
          </div>
          <button className='searchBtn'>
            <FaSearch />
          </button>
        </StyledSearch>

        <StyledUser>
          {isLoggedIn && (
            <button className='logout' onClick={logout}>
              <IoLogOutOutline />
            </button>
          )}
          {isLoggedIn ? (
            <Link to='/user'>
              <Avatar image={user?.image} />
            </Link>
          ) : (
            <button className='userinfo' onClick={handleLoginButtonClick}>
              <FaRegCircleUser />
            </button>
          )}
        </StyledUser>
      </StyledHeader>
    </>
  );
}

// Header Styles
const StyledHeader = styled.header`
  z-index: 10;
  width: 100%;
  height: 90px;
  padding: 20px;
  box-shadow: 0 0 5px lightgray;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  position: sticky;
  top: 0;
  background-color: white;
  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      height: 90px;
      padding: 20px;
    }
  }

  & > * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  width: 20%;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  .logo {
    width: 2rem;
    /* margin-right: 10px; */
  }
  .logoTitle {
    width: 8em;
    height: 100%;
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      width: 15%;
    }
    .logoTitle {
      visibility: hidden;
      color: transparent;
    }
  }
`;

const StyledSearch = styled.div`
  width: 50%;
  height: 100%;
  border-radius: 1000px;
  box-shadow: 0 3px 10px lightgray;
  display: flex;
  & > div:first-child {
    width: calc(100% - 50px);
    height: 100%;
    display: flex;
    justify-content: space-between;
  }
  button {
    background-color: transparent;
    border: none;
    &:hover {
      background-color: lightgray;
    }
  }
  input {
    width: 60%;
    height: 100%;
    padding: 0 1.5em;
    border: none;
    font-size: 1em;
    border-radius: 10000px;
    background-color: transparent;
    &::placeholder {
      text-align: center;
    }
    &:hover {
      background-color: lightgray;
    }
  }
  .optBtns {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 10000px;
    white-space: nowrap;
    &:hover {
      background-color: lightgray;
    }
    svg {
      width: 1.2em;
      height: 1.2em;
    }
  }
  .searchBtn {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: transparent;
    border-radius: 10000px;
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      width: 70%;
    }
    input {
      width: 100%;
    }
    .optBtns {
      display: none;
    }
  }
`;

const StyledUser = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  button {
    width: 50px;
    height: 50px;
    background-color: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
      background-color: #eeeeee;
      border-radius: 1000px;
    }
    svg {
      width: 50%;
      height: 50%;
    }
  }
  .logout > svg {
    width: 60%;
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      width: 15%;
    }
    .login {
      display: none;
    }
  }
`;
