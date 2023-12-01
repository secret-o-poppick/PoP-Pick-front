import styled, { css } from 'styled-components';
import { useState } from 'react';
import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';

import { MEDIA_LIMIT, MEDIA_MAX_LIMIT } from '@/assets/styleVariable';
import { StoreTag } from '@/components/Tag';
import { data } from '@/data/stores';

export default function Map() {
  const [stores, setStores] = useState(data);
  const [isListOpened, setListOpened] = useState<boolean>(false);
  const listOpenHandler = () => {
    setListOpened((cur) => !cur);
  };
  return (
    <>
      <StyledMap $isListOpened={isListOpened}>
        <div>
          <div className='mapWrapper'>
            <div className='refreshBtn'>
              <div>주변 팝업 보기</div>
            </div>
          </div>
          <div className='listWrapper'>
            <div className='listBtn' onClick={listOpenHandler}>
              <div></div>
            </div>
            <div className='list'>
              <StyledStoreGrid>
                {stores.map((store, index) => {
                  /**페이지 네이션으로 처리하기 */
                  if (index >= 4) {
                    return;
                  }
                  const title = store.type === 'popup' ? '팝업' : '전시';

                  return (
                    <div key={index} className='storeInfoDiv'>
                      <div className='storeInfoTagDiv'>
                        <StoreTag color={store.type} title={title} />
                        {store.adultVerification && (
                          <div className='tagMargin'>
                            <StoreTag color='adult' title='성인' />
                          </div>
                        )}
                      </div>
                      <img src={store.images[0]} />

                      <div className='storeInfoContents'>
                        <h3>{store.name}</h3>
                        <p>{store.date}</p>
                        <p>{store.address}</p>
                        <div className='storeIconsDiv'>
                          <FaRegHeart style={{ marginRight: 10 }} />
                          <FaRegBookmark />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </StyledStoreGrid>

              <StyledPagenationDiv>
                페이지네이션 들어갈 자리
              </StyledPagenationDiv>
            </div>
          </div>
        </div>
      </StyledMap>
    </>
  );
}

const StyledPagenationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const StyledStoreGrid = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 50%);

  & .storeInfoTagDiv {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
  }

  & .storeInfoDiv {
    /* margin-bottom: 20px; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1rem;
  }

  & .storeInfoDiv .tagMargin {
    margin-right: 140px;
  }

  & > .storeInfoDiv img {
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    height: 200px;
    margin-bottom: 10px;
  }

  & .storeIconsDiv {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  & .storeInfoDiv .tagMargin {
    margin-right: 140px;
  }

  & > .storeInfoDiv > .storeInfoContents {
    width: 100%;
    h3 {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      padding: 0 25px;
      grid-template-columns: repeat(1, 100%);
      position: relative;
      overflow: scroll;
    }

    & .storeInfoDiv {
      margin-bottom: 20px;
      display: flex;
      flex-direction: row;
      position: relative;
    }
    & .storeInfoDiv .tagMargin {
      margin-right: 120px;
    }

    & .storeInfoTagDiv {
      width: 340px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      position: absolute;
      top: 0;
      right: 0;
    }

    & > .storeInfoDiv img {
      border: 1px solid black;
      margin-right: 10px;
      width: 150px;
      height: 150px;
    }

    & > .storeInfoDiv > .storeInfoContents {
      height: 130px;
      width: 400px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  @media (min-width: ${MEDIA_MAX_LIMIT}) {
    & {
      grid-template-columns: repeat(3, 33%);
    }
  }
`;

const StyledMap = styled.div<{
  $isListOpened: boolean;
}>`
  width: 100%;
  height: calc(100vh - 90px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.5em;
  box-sizing: border-box;
  & > div:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 2em;
    border-radius: 20px;
  }
  .mapWrapper {
    width: 100%;
    height: 100%;
    background-color: lightgreen;
    border-radius: 20px;
    box-shadow: 0 0 10px gray;
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
    & > div:first-child {
      width: 100%;
      height: 100%;
      flex-direction: column;
      gap: 0;
      position: relative;
      box-shadow: none;
      justify-content: flex-end;
    }
    .mapWrapper {
      height: 100%;
      border-radius: 0;
    }
    .listWrapper {
      margin-top: auto;
      position: absolute;
      border-radius: 20px 20px 0 0;
      box-shadow: 0 -5px 10px -10px black;
      transition-duration: 0.5s;

      ${({ $isListOpened }) => css`
        height: ${$isListOpened ? '90%' : '5%'};
        .list {
          visibility: ${$isListOpened ? 'visible' : 'hidden'};
        }
      `}

      .list {
        transition-duration: 0.5s;
      }

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
