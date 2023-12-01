import styled from 'styled-components';
import { useState } from 'react';
import SearchPage from './SearchPage';
import { Link } from 'react-router-dom';
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
  const [searchType, setSearchType] = useState<string>('');

  const stringBtnHandler = () => {
    if (document.body.clientWidth > 700) return;
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

  return (
    <>
      <SearchPage
        setSearchOpened={setSearchOpened}
        isSearchOpened={isSearchOpened}
        searchType={searchType}
        locationBtnHandler={locationBtnHandler}
        dateBtnHandler={dateBtnHandler}
      />

      <StyledHeader>
        <StyledLink to='/'>
          <img className='logo' src={logoImg} alt='logo' />
          <img className='logoTitle' src={logoTitleImg} alt='logo' />
        </StyledLink>

        <StyledSearch>
          <div className='stringWrapper' onClick={stringBtnHandler}>
            <input placeholder='✨Pick 하고 싶은 장소 찾기!✨' />
            <button>
              <FaSearch />
            </button>
          </div>
          <button className='optBtns' onClick={locationBtnHandler}>
            <div>위치</div>
            <MdLocationPin />
          </button>
          <button className='optBtns' onClick={dateBtnHandler}>
            <div>기간</div>
            <FaRegCalendarCheck />
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
  & > * {
    height: 100%;
    display: flex;
    align-items: center;
    border-radius: 1000px;
  }
  .stringWrapper {
    width: 60%;
    &:hover {
      background-color: lightgray;
    }
    input {
      width: 90%;
      height: 100%;
      padding: 0 10px;
      border: none;
      border-radius: 10000px;
      font-size: 1em;
      background-color: transparent;
    }
    button {
      width: 10%;
      height: 100%;
      padding: 0;
      margin-right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
    }
  }
  .optBtns {
    width: 20%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: none;
    background-color: transparent;
    &:hover {
      background-color: lightgray;
    }
    svg {
      width: 1.2em;
      height: 1.2em;
    }
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      width: 70%;
    }
    .stringWrapper {
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
