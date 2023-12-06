import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { addDays, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { DayPicker, DateRange } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

//Icons
import { TbLocation } from 'react-icons/tb';
import { PiMapTrifold } from 'react-icons/pi';
import { FaLongArrowAltRight } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { FaRegCalendarCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Button from '@/components/Button';
import { CitiesType } from '@/types';

interface SearchPageProps {
  setSearchOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchOpened: boolean;
  searchType: string;
  locationBtnHandler: () => void;
  dateBtnHandler: () => void;
  setSelectedCity: (cityId: string) => void;
  selectedCity: string;
  selectedDistrict: string;
  setSelectedDistrict: (districtId: string) => void;
  onDateChange: (newRange: DateRange | undefined) => void;
  searchButtonHandler: () => void;
  selectedCityName: string;
  selectedDistrictName: string;
  cities: CitiesType[];
  districts: CitiesType[];
  setCities: React.Dispatch<React.SetStateAction<CitiesType[]>>;
  setDistricts: React.Dispatch<React.SetStateAction<CitiesType[]>>;
}

export default function SearchPage({
  setSearchOpened,
  isSearchOpened,
  searchType,
  locationBtnHandler,
  dateBtnHandler,
  setSelectedCity,
  setSelectedDistrict,
  onDateChange,
  searchButtonHandler,
  selectedCityName,
  selectedDistrictName,
  cities,
  districts,
  setCities,
  setDistricts,
}: SearchPageProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCityItem, setSelectedCityItem] = useState<string | null>(null);
  const [selectedDistrictItem, setSelectedDistrictItem] = useState<string | null>(null);

  const today = new Date();
  const defaultSelected: DateRange = {
    from: today,
    to: addDays(today, 0),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const isDateRangeSelected = !!range?.from && !!range?.to;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<CitiesType[]>(
          'http://localhost:3310/api/regionCategories'
        );
        setCities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error', error);
      }
    };
    fetchData();
  }, []);


  useEffect(() => {
    const body = document.body;

    if (isSearchOpened) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'auto';
    }
    return () => {
      body.style.overflow = 'auto';
    };
  }, [isSearchOpened]);

  const closeSearchTab = () => {
    setSearchOpened(false);
    console.log(1);
  };

  const selectCityHandler = (cityId: string) => {
    setSelectedCity(cityId);
    const selectedCity = cities.find(city => city._id === cityId);
    if (selectedCity) {
      setDistricts(selectedCity.children || []);
    }
  };

  const selectDistrictHandler = (districtId: string) => {
    setSelectedDistrict(districtId);
  };

  // 위치, 기간 초기화
  const resetButtonHandler = () => {
    setSelectedCity('');
    setSelectedDistrict('');
    setRange(defaultSelected)
  }

  return (
    <>
      <StyledBlack $isSearchOpened={isSearchOpened} />
      <StyledMore className='searchPage' $isSearchOpened={isSearchOpened}>
        {searchType === 'location' ? (
          <StyledLocation className='searchTap'>
            <div className='btnWrapper'>
              <Link to='/map'>
                <button>
                  <PiMapTrifold />
                  <p>지도로 위치 검색</p>
                </button>
              </Link>
            </div>
            <div className='locationWrapper'>
              <ul>
                {loading ? (
                  <li>Loading...</li>
                ) : (
                  cities.map((city, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        selectCityHandler(city._id);
                        setSelectedCityItem(city._id);
                      }}
                      className={selectedCityItem === city._id ? 'selected' : ''}
                    >
                      {city.name}
                    </li>
                  ))
                )}
              </ul>
              <div className='districts'>
                {loading ? (
                  <div>Loading...</div>
                ) : (
                  districts.map((district, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        selectDistrictHandler(district._id);
                        setSelectedDistrictItem(district._id);
                        setTimeout(() => dateBtnHandler(), 500)
                      }}
                      className={selectedDistrictItem === district._id ? 'selected' : ''}

                    >
                      {district.name}
                    </button>
                  ))
                )}
              </div>
            </div>
          </StyledLocation>
        ) : searchType === 'date' ? (
          <StyledDate className='searchTap' $rangeToExists={isDateRangeSelected}>
            <StyledDayPicker
              mode='range'
              defaultMonth={today}
              selected={range}
              onSelect={(newRange) => {
                setRange(newRange);
                onDateChange(newRange);
              }}
              locale={ko}
            />
            <div
              className={`dateRangeWrapper ${isDateRangeSelected ? 'scale-up' : ''}`}
              onClick={isDateRangeSelected ? searchButtonHandler : undefined}
            >
              <div className='dateRange'>
                <span className='mDate'>{range?.from ? format(range.from, 'PPP', { locale: ko }) : null}</span>
              </div>
              <FaLongArrowAltRight />
              <div className='dateRange'>
                <span className='mDate'>{range?.to ? format(range.to, 'PPP', { locale: ko }) : null}</span>
              </div>
            </div>
            {/* <button onClick={stringBtnHandler}>선택</button> */}
          </StyledDate>
        ) : searchType === 'string' ? (
          <StyledString>
            <div>
              <div className='searchKeywords'>
                <div>
                  <div><span>위치</span> : </div>
                  {selectedCityName} {selectedDistrictName}
                </div>
                <div className='dateRange'>
                  <div><span>기간</span> : </div>
                  {range?.from ? format(range.from, 'PPP', { locale: ko }) : null}
                  {range && <FaLongArrowAltRight />}
                  {range?.to ? format(range.to, 'PPP', { locale: ko }) : null}
                </div>
              </div>
              <div className='optBtns'>
                <button onClick={locationBtnHandler}>
                  <div>위치 선택</div>
                  <MdLocationPin />
                </button>
                <button onClick={dateBtnHandler}>
                  <div>기간 선택</div>
                  <FaRegCalendarCheck />
                </button>
              </div>
              <div className='commitBtns'>
                <Button onClick={resetButtonHandler}>초기화</Button>
                <Button onClick={searchButtonHandler}>검색</Button>
              </div>
            </div>
          </StyledString>
        ) : null}
        <div className='closeBtn' onClick={closeSearchTab}></div>
      </StyledMore>
    </>
  );
}

const StyledBlack = styled.div<{
  $isSearchOpened: boolean;
}>`
  z-index: 10;
  ${({ $isSearchOpened }) => css`
    visibility: ${$isSearchOpened ? 'visible' : 'hidden'};
  `}
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
`;

// Search Styles
const StyledMore = styled.div<{
  $isSearchOpened: boolean;
}>`
  z-index: 10;
  width: 100vw;
  height: 0;
  position: fixed;
  transition-property: height;
  transition-duration: 0.5s;

  & > div:first-child {
    padding-top: 90px;
    transition-duration: 1s;
    background-color: white;
    overflow: hidden;
    border-radius: 0 0 10px 10px;
  }

  .closeBtn {
    height: 100%;
  }

  ${({ $isSearchOpened }) => css`
    visibility: ${$isSearchOpened ? 'visible' : 'hidden'};
    height: ${$isSearchOpened ? '100vh' : '0'};
  `}
`;

const StyledLocation = styled.div`
  height: 68vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
.btnWrapper {
    margin-bottom: 20px;
  }
  button {
    width: 200px;
    height: 3em;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    
    &:hover {
      background-color: lightgray;
    }

    svg {
      width: 1.2em;
      height: 1.2em;
      margin-right: 10px;
    }
  }

  .locationWrapper {
    width: 80%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 5px lightgray;
    ul {
      width: 10%;
      list-style: none;
      display: flex;
      flex-direction: column;
      justify-content:space-between;
    }

    li {
      width: 100%;
      padding:0.5em 0;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      cursor: pointer;

      &:hover {
        background-color: #fff2d4;
      }
      &.selected {
        background-color: #F5C553;
      }
    }

    li:first-child{
      border-right: 1px solid #ccc;
      border-top-left-radius: 5px;
    }

    li:last-child{
      border:none;
      border-right: 1px solid #ccc;
      border-bottom-left-radius: 5px;
    }

    .districts {
      width: 90%;
      margin-left:0.5em;
      display: grid;
      grid-template-columns: repeat(5, 20%);

      div {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      button {
        width: 100%;
        height: 5em;
        background-color: transparent;
        margin: 0;
        padding: 0;
        cursor: pointer;

        &:hover {
          background-color: #fff2d4;
        }
        &.selected {
        background-color: #F5C553;
        }
      }
    }
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    .districts {
      grid-template-columns: repeat(3, 33%) !important;
    }
    .locationWrapper li {
      font-size: 0.8em;
    }
  }
`;

const StyledDate = styled.div<{ $rangeToExists?: boolean }>`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    margin: 0 10px;
  }

  .dateRangeWrapper {
    width: 35%;
    height: 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
    border-radius: 20px;
    border: 2px solid ${(props) => (props.$rangeToExists ? '#ffcb52' : 'lightgray')};
    background-color: ${(props) => (props.$rangeToExists ? '#ffcb52' : 'transparent')}; /* Fix: Removed unnecessary quotes */
    color: #000; /* Fix: Removed unnecessary quotes */
    cursor: pointer;
    padding: 1em;
    transform: scale(100%);
    transition: transform 0.3s ease;

    &.scale-up {
      transform: scale(103%);
    }

    .dateRange {
      width: 50%;
      text-align: center;
    }
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    .mDate {
      font-size: 0.8em;
      word-break: keep-all;
    }
  }
`;

const StyledDayPicker = styled(DayPicker)`
  box-shadow: 0 0 10px lightgray;
  padding: 10px;
  border-radius: 10px;

  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #fff2d4;
  }

  .rdp-day {
    color: gray;
    display: flex;
    align-items: center;
  }

  .rdp-day_today:not(.rdp-day_outside) {
    font-weight: 800;
    color: black;
  }

  .rdp-day_selected {
    background-color: #ffcb52;
    color: black;

    &:hover {
      background-color: #eb5b42;
    }
  }
`;

const StyledString = styled.div`
  height: 40%;

  & > div {
    display: flex;
    row-gap: 2em;
  }

  & > div:first-child {
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1em;
    box-sizing: border-box;
  }
  .searchKeywords {
    width: 80%;
    height: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    white-space: nowrap;
    & > div {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      & > div:first-child {
        margin-right: 10px;
      }
      & span {
        font-weight: bold;
      }
    }
    .dateRange > svg {
      margin: 0 10px;
    }
  }
  .optBtns {
    width: 80%;
    height: 20%;
    display: none;
    align-items: center;
    justify-content: space-between;
    gap: 2em;
    button {
      width: 50%;
      height: 100%;
      padding: 10px 0;
      background-color: transparent;
      border: 2px solid #ffb70f;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 1em;
    }
  }
  .commitBtns {
    display: flex;
    column-gap: 2em;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 2.3em;
    & > Button {
      width: 50%;
      font-weight: bold;
      font-size: 9px;
      transition: background-color 0.3s ease;
      color: #000;
    }
    & Button:first-child {
      background-color: transparent;
      box-shadow: 0 0 0 2px #f5c553 inset;
    }
    & Button:last-child {
      background-color: #f5c553;
    }
    & Button:last-child:hover {
      background-color: #ffb70f;
    }
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    .optBtns {
      display: flex;
    }
  }
`;