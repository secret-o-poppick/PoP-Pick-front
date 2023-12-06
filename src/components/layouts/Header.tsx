import styled from 'styled-components';
import { useEffect, useState } from 'react';
import SearchPage from './SearchPage';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { DateRange } from 'react-day-picker';

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
import { CitiesType } from '@/types';

export default function Header() {
  const { isLoggedIn, logout, user } = useAuth();
  const [isSearchOpened, setSearchOpened] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>('');

  const [isLogin, setIsLogin] = useState<boolean>(false);
  const location = useLocation();
  const [searchInput, setSearchInput] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [dateFrom, setDateFrom] = useState<string | undefined>('');
  const [dateTo, setDateTo] = useState<string | undefined>('');
  const [cities, setCities] = useState<CitiesType[]>([]);
  const [districts, setDistricts] = useState<CitiesType[]>([]);
  const selectedCityName =
    cities.find((city) => city._id === selectedCity)?.name || '';
  const selectedDistrictName =
    districts.find((district) => district._id === selectedDistrict)?.name || '';

  const navigate = useNavigate();

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

  // 위치 선택
  const handleCitySelect = (cityId: string) => {
    setSelectedCity(cityId);
  };
  const handleDistrictSelect = (districtId: string) => {
    setSelectedDistrict(districtId);
  };

  // 기간 선택
  const setDateRange = (newRange: DateRange | undefined) => {
    if (newRange) {
      const formatDateString = (date: Date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };

      const fromDateString = newRange.from
        ? formatDateString(newRange.from)
        : '';
      const toDateString = newRange.to ? formatDateString(newRange.to) : '';

      setDateFrom(fromDateString);
      setDateTo(toDateString);

      console.log('From:', fromDateString);
      console.log('To:', toDateString);
    }
  };

  // 검색버튼
  const searchButtonHandler = () => {
    const searchParams = new URLSearchParams(location.search);

    // 검색어
    if (searchInput) {
      searchParams.set('title', searchInput);
    } else {
      searchParams.delete('title');
    }

    // 위치
    if (selectedDistrict) {
      searchParams.set('locationId', selectedDistrict);
    } else if (selectedCity) {
      searchParams.set('locationId', selectedCity);
    } else {
      searchParams.delete('locationId');
    }

    // 기간
    if (dateFrom && dateTo) {
      searchParams.set('startDate', dateFrom);
      searchParams.set('endDate', dateTo);
    } else {
      searchParams.delete('startDate');
      searchParams.delete('endDate');
    }

    navigate(`/stores?${searchParams}`);

    setSearchOpened(false);
    setSearchInput('');
  };

  // 엔터로 검색
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      searchButtonHandler();
    }
  };

  const searchInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
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
        setSelectedCity={handleCitySelect}
        selectedCity={selectedCity}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={handleDistrictSelect}
        onDateChange={setDateRange}
        searchButtonHandler={searchButtonHandler}
        selectedCityName={selectedCityName}
        selectedDistrictName={selectedDistrictName}
        cities={cities}
        districts={districts}
        setCities={setCities}
        setDistricts={setDistricts}
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
              onChange={searchInputHandler}
              onKeyDown={handleKeyPress}
              value={searchInput}
            />
            <button className='optBtns' onClick={locationBtnHandler}>
              <div>
                {selectedCityName || selectedDistrictName ? (
                  `${selectedCityName} ${selectedDistrictName}`
                ) : (
                  <div>
                    <MdLocationPin />
                    위치
                  </div>
                )}
              </div>
            </button>
            <button className='optBtns' onClick={dateBtnHandler}>
              <div>
                {dateFrom || dateTo ? (
                  `${dateFrom} ${dateTo}`
                ) : (
                  <div>
                    <FaRegCalendarCheck />
                    기간
                  </div>
                )}
              </div>
            </button>
          </div>
          <button className='searchBtn' onClick={searchButtonHandler}>
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
    display: flex;
    flex: 1;
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
    width: 23%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10000px;
    white-space: nowrap;
    font-size: 0.77em;
    &:hover {
      background-color: lightgray;
    }

    & > div > div {
      display: flex;
      align-items: center;
    }
    svg {
      width: 1.2em;
      height: 1.2em;
      margin-right: 0.5em;
    }
  }
  .searchBtn {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background-color: white;
    border-radius: 0 50% 50% 0;
    cursor: pointer;
    &:hover {
      border-radius: 50%;
    }
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
  gap: 1em;
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
      border-radius: 50%;
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
    .logout {
      display: none;
    }
  }
  .userinfo {
    cursor: pointer;
  }
`;
