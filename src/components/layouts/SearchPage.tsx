import styled, { css } from "styled-components";
import { useState } from "react";

import { addDays, format } from "date-fns";
import { ko } from "date-fns/locale";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";

//icons
import { TbLocation } from "react-icons/tb";
import { PiMapTrifold } from "react-icons/pi";
import { cities, districts } from "@/data";
import { FaLongArrowAltRight } from "react-icons/fa";

interface SearchPageProps {
  setSearchOpened: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchOpened: boolean;
  searchType: string;
}

export default function SearchPage({
  setSearchOpened,
  isSearchOpened,
  searchType,
}: SearchPageProps) {
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  //Date Picker
  const today = new Date();
  const defaultSelected: DateRange = {
    from: today,
    to: addDays(today, 0),
  };
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  //Date Picker

  const closeSearchtab = () => {
    setSearchOpened(false);
  };
  const selectCityHandler = (index: number) => {
    setSelectedCity(index);
  };
  return (
    <>
      <StyledMore className='searchPage' $isSearchOpened={isSearchOpened}>
        {searchType === "location" ? (
          <StyledLocation className='searchTap'>
            <div className='btnWrapper'>
              <button>
                <TbLocation />
                <p>현위치로 검색</p>
              </button>
              <button>
                <PiMapTrifold />
                <p>지도로 위치 검색</p>
              </button>
            </div>
            <div className='locationWrapper'>
              <ul>
                {cities.map((city, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      selectCityHandler(index);
                    }}
                  >
                    {city}
                  </li>
                ))}
              </ul>
              <div className='districts'>
                {districts[selectedCity].map((district, index) => (
                  <div key={index}>
                    <button
                      onClick={() => {
                        alert(cities[selectedCity] + " " + district);
                        setSelectedDistrict(district);
                      }}
                    >
                      {district}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </StyledLocation>
        ) : (
          <StyledDate className='searchTap'>
            <StyledDayPicker
              mode='range'
              defaultMonth={today}
              selected={range}
              onSelect={setRange}
              locale={ko}
            />
            <div className='dateRangeWrapper'>
              <div className='dateRange'>
                {range?.from ? format(range.from, "PPP", { locale: ko }) : null}
              </div>
              <FaLongArrowAltRight />
              <div className='dateRange'>
                {range?.to ? format(range.to, "PPP", { locale: ko }) : null}
              </div>
            </div>
            <button className='searchBtn'>검색</button>
          </StyledDate>
        )}
        <div className='closeBtn' onClick={closeSearchtab}></div>
      </StyledMore>
    </>
  );
}

// Search Styles
const StyledMore = styled.div<{
  $isSearchOpened: boolean;
}>`
  z-index: 10;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  position: fixed;
  transition-duration: 0.5s;
  .searchTap {
    padding-top: 90px;
    transition-duration: 0.5s;
    background-color: white;
    overflow: hidden;
  }
  .closeBtn {
    height: 100%;
  }

  ${({ $isSearchOpened }) => css`
    visibility: ${$isSearchOpened ? "visible" : "hidden"};

    .searchTap {
      height: ${$isSearchOpened ? "60%" : "0"};
    }
  `}
`;

const StyledLocation = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .btnWrapper {
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
  }
  button {
    width: 200px;
    height: 40px;
    margin: 0 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: lightgray;
    border: none;
    &:hover {
      background-color: gray;
    }
    svg {
      width: 1.2em;
      height: 1.2em;
      margin-right: 10px;
    }
  }
  .locationWrapper {
    width: 80%;
    height: 60%;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    box-shadow: 0 0 5px lightgray;
    overflow: hidden;
    ul {
      width: 10%;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      background: lightgray;
    }
    li {
      width: 100%;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: gray;
      }
    }
    .districts {
      width: 90%;
      display: grid;
      grid-template-columns: repeat(5, 20%);
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          background-color: lightgray;
        }
        button {
          background-color: transparent;
        }
      }
    }
  }
`;
const StyledDate = styled.div`
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .dateRangeWrapper {
    width: 35%;
    display: flex;
    justify-content: space-between;
  }
  .dateRange {
  }
  .searchBtn {
    width: 40%;
    padding: 10px;
    margin-top: 10px;
    background-color: transparent;
    border: none;
    &:hover {
      box-shadow: 0 0 10px lightgray;
      background-color: lightgray;
      border-radius: 1000px;
    }
  }
`;

const StyledDayPicker = styled(DayPicker)`
  box-shadow: 0 0 10px lightgray;
  padding: 10px;
  border-radius: 10px;
  .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
    background-color: #1778f2;
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
      background-color: #ff5c40;
    }
  }
`;
