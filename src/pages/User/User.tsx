import styled from 'styled-components';
import { useState } from 'react';

import { MEDIA_LIMIT, MEDIA_MAX_LIMIT } from '@/assets/styleVariable';
import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';

import logo from '@/assets/logo.svg';
import { data } from '@/data/stores';
import { StoreTag } from '@/components/Tag';

export default function User() {
  const [stores, setStores] = useState(data);
  const userData = {
    nickname: 'Nickname',
    id: 'POP USER',
    email: 'test@test.com',
    register: false,
  };
  return (
    <>
      <StyledUser>
        <div>
          <div className='userWrapper'>
            <div className='profile'>
              <img src={logo} />
              <div>{userData.nickname}</div>
              <div>{userData.id}</div>
              <div>{userData.email}</div>
            </div>
            <div className='btnsWrapper'>
              {userData.register ? (
                <div>+사업자 등록</div>
              ) : (
                <div>+이벤트 새로 등록하기</div>
              )}
              <div className='resign'>탈퇴하기</div>
            </div>
          </div>
          <div className='listWrapper'>
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
            <StyledPagenationDiv>페이지네이션 들어갈 자리</StyledPagenationDiv>
          </div>
        </div>
      </StyledUser>
    </>
  );
}

const StyledPagenationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const StyledStoreGrid = styled.div`
  height: 99%;
  display: grid;
  grid-template-columns: repeat(3, 33%);
  padding: 10px;

  & .storeInfoTagDiv {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
  }

  & .storeInfoDiv {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  & .storeInfoDiv .tagMargin {
    margin-right: 140px;
  }

  & > .storeInfoDiv img {
    border: 1px solid black;
    border-radius: 10px;
    width: 200px;
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
    width: 200px;
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

const StyledUser = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
  padding: 3em;
  box-sizing: border-box;
  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    gap: 2em;
  }
  .userWrapper {
    width: 30%;
    height: 100%;
    box-shadow: 0 0 10px lightgray;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
  .profile {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    font-size: 1em;
    font-weight: bold;
    div {
      padding-left: 10px;
    }
    img {
      width: 150px;
      height: 150px;
      border: 2px solid black;
      border-radius: 10px;
    }
  }
  .btnsWrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: auto;
    padding: 10px;
    box-sizing: border-box;
    & > div {
      border-radius: 10000px;
      padding: 5px 10px;
      font-size: 10px;
      &:hover {
        background-color: lightgray;
        cursor: pointer;
      }
    }
  }
  .listWrapper {
    width: 70%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    padding: 0;
    & > div {
      flex-direction: column;
      gap: 0;
    }
    .userWrapper {
      width: 100%;
      .resign {
        display: none;
      }
    }
    .listWrapper {
      width: 100%;
    }
  }
`;
