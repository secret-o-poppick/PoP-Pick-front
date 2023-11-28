import styled, { css } from "styled-components";
import { useState } from "react";

// icons
import logoImg from "@/assets/logo.svg";
import { TbLogin2 } from "react-icons/tb";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { MEDIA_LIMIT } from "@/assets/styleVariable";
import { TbLocation } from "react-icons/tb";
import { PiMapTrifold } from "react-icons/pi";
import { cities, districts } from "@/data";

export default function Header() {
  const [isSearchOpened, setSearchOpened] = useState<boolean>(false);
  const [searchType, setSearchType] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<number>(0);
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");

  const closeSearchtab = () => {
    setSearchOpened(false);
  };
  const stringBtnHandler = () => {
    setSearchOpened(true);
    setSearchType("string");
  };
  const locationBtnHandler = () => {
    setSearchOpened(true);
    setSearchType("location");
  };
  const dateBtnHandler = () => {
    setSearchOpened(true);
    setSearchType("date");
  };

  const selectCityHandler = (index: number) => {
    setSelectedCity(index);
  };

  return (
    <>
      <StyledMore $isSearchOpened={isSearchOpened}>
        {searchType === "string" ? (
          <StyledString className='searchTap'>추천 검색어</StyledString>
        ) : searchType === "location" ? (
          <StyledLocation className='searchTap'>
            <div id='btnWrapper'>
              <button>
                <TbLocation />
                <p>현위치로 검색</p>
              </button>
              <button>
                <PiMapTrifold />
                <p>지도로 위치 검색</p>
              </button>
            </div>
            <div id='locationWrapper'>
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
              <div id='districts'>
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
            <div>
              <input
                type='date'
                value={new Date().toISOString().substring(0, 10)}
              />
              <input
                type='date'
                value={new Date().toISOString().substring(0, 10)}
              />
            </div>
            <div>
              <button>검색</button>
            </div>
          </StyledDate>
        )}
        <div id='closeBtn' onClick={closeSearchtab}></div>
      </StyledMore>

      <StyledHeader>
        <StyledLogo>
          <img src={logoImg} alt='logo' />
          <h1>Pop Pick</h1>
        </StyledLogo>

        <StyledSearch>
          <div id='stringWrapper' onClick={stringBtnHandler}>
            <input />
            <button>
              <FaSearch />
            </button>
          </div>
          <button onClick={locationBtnHandler}>
            <div>위치</div>
            <MdLocationPin />
          </button>
          <button onClick={dateBtnHandler}>
            <div>기간</div>
            <FaRegCalendarCheck />
          </button>
        </StyledSearch>

        <StyledUser>
          <div id='login'>
            <TbLogin2 />
          </div>
          <div id='userinfo'>
            <FaRegCircleUser />
          </div>
        </StyledUser>
      </StyledHeader>
    </>
  );
}

// Search Styles
const StyledMore = styled.div<{
  $isSearchOpened: boolean;
}>`
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
  #closeBtn {
    height: 100%;
  }
  ${({ $isSearchOpened }) => {
    return (
      ($isSearchOpened &&
        css`
          visibility: visible;
          .searchTap {
          }
        `) ||
      (!$isSearchOpened &&
        css`
          visibility: hidden;
          .searchTap {
            height: 0;
          }
        `)
    );
  }}
`;

const StyledString = styled.div`
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const StyledLocation = styled.div`
  height: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  #btnWrapper {
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
  #locationWrapper {
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
    #districts {
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
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  div {
    width: 40%;
    height: 40px;
    padding: 10px;
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: lightgray;
    border-radius: 10000px;
    /* box-shadow: 0 0 10px lightgray; */
    input {
      width: 40%;
      height: 100%;
      padding: 0 20px;
      font-size: 1em;
      border-radius: 10000px;
      border: none;
    }
    button {
      width: 100%;
      height: 100%;
      border: none;
      background-color: transparent;

      /* box-shadow: 0 0 10px lightgray; */
      border-radius: 10000px;
      font-size: 1em;
      &:hover {
        background-color: white;
      }
    }
  }
`;

// Header Styles
const StyledHeader = styled.header`
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

const StyledLogo = styled.div`
  width: 20%;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  justify-content: flex-start;
  white-space: nowrap;
  img {
    width: 2rem;
    margin-right: 10px;
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      width: 15%;
    }
    & > h1 {
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
  #stringWrapper {
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
      font-size: 20px;
      background-color: transparent;
    }
    button {
      width: 10%;
      height: 100%;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border: none;
      background-color: transparent;
    }
  }
  button {
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
  }
`;

const StyledUser = styled.div`
  width: 20%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      width: 15%;
    }
  }
`;
