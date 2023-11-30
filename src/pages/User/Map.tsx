import styled, { css } from "styled-components";
import { MEDIA_LIMIT } from "@/assets/styleVariable";
import { useState } from "react";

export default function Map() {
  const [isListOpened, setListOpened] = useState<boolean>(false);
  const listOpenHandler = () => {
    setListOpened((cur) => !cur);
  };
  return (
    <>
      <StyledMap $isListOpened={isListOpened}>
        <div className='wrapper'>
          <div className='mapWrapper'>
            <div className='refreshBtn'>
              <div>주변 팝업 보기</div>
            </div>
          </div>
          <div className='listWrapper'>
            <div className='listBtn' onClick={listOpenHandler}>
              <div></div>
            </div>
            <div className='list'></div>
          </div>
        </div>
      </StyledMap>
    </>
  );
}

const StyledMap = styled.div<{
  $isListOpened: boolean;
}>`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3em;
  box-sizing: border-box;
  .wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 2em;
    box-shadow: 0 0 10px gray;
    border-radius: 20px;
    overflow: hidden;
  }
  .mapWrapper {
    width: 100%;
    height: 100%;
    background-color: lightgreen;
    .refreshBtn {
      margin-top: 1em;
      width: 100%;
      display: flex;
      justify-content: center;
      div {
        width: 50%;
        padding: 5px 0;
        border: 2px solid #1778f2;
        border-radius: 10000px;
        color: #1778f2;
        font-weight: bold;
        text-align: center;
        background-color: white;
      }
    }
  }
  .listWrapper {
    width: 100%;
    height: 100%;
    background-color: white;
    .listBtn {
      display: none;
    }
    .list {
      width: 100%;
      height: 100%;
    }
  }
  @media (max-width: ${MEDIA_LIMIT}) {
    padding: 0;
    .wrapper {
      width: 100%;
      height: 100%;
      flex-direction: column;
      gap: 0;
      position: relative;
      box-shadow: none;
      justify-content: flex-end;
      border-radius: 0;
    }
    .mapWrapper {
      height: 100%;
    }
    .listWrapper {
      margin-top: auto;
      position: absolute;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -5px 10px -10px black;
      transition-duration: 0.5s;

      ${({ $isListOpened }) => {
        return (
          ($isListOpened &&
            css`
              height: 90%;
            `) ||
          (!$isListOpened &&
            css`
              height: 10%;
              .list {
                visibility: hidden;
                transition-duration: 0.5s;
              }
            `)
        );
      }}
      .listBtn {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 20px 20px 0 0;
        & > div {
          width: 80px;
          height: 5px;
          background-color: gray;
          border-radius: 1000px;
        }
      }
    }
  }
`;
