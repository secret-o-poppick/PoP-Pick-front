import styled from 'styled-components';
import Select from 'react-select';
import { useState } from 'react';

import { MEDIA_LIMIT, MEDIA_MAX_LIMIT } from '@/assets/styleVariable';
import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';

import logo from '@/assets/logo.svg';
import { data } from '@/data/stores';
import { StoreTag } from '@/components/Tag';
import FilterButton from '@/components/FilterButton';
import Pagination from '@/components/Pagination';

interface optionsProp {
  value: string;
  label: string;
}

export default function User() {
  const [stores, setStores] = useState(data);
  const selectOptions = [
    {
      value: 'latetes',
      label: '최신 오픈 순',
    },
    {
      value: 'likes',
      label: '좋아요 순',
    },
    {
      value: 'views',
      label: '조회수 순',
    },
  ];

  const handleFilterButton = () => {
    console.log('Filter Button click');
  };

  const handleFilter = (e: optionsProp | null) => {
    console.log(`${e?.label}으로 필터링 : value = ${e?.value}`);
  };

  const userData = {
    nickname: 'Nickname',
    id: 'POP USER',
    email: 'test@test.com',
    register: true,
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
            <StyledMainButtonDiv>
              <div className='mainButtonDiv'>
                <FilterButton onClick={handleFilterButton} color='notice'>
                  북마크
                </FilterButton>
                <FilterButton onClick={handleFilterButton} color='error'>
                  좋아요
                </FilterButton>
                {userData.register && (
                  <FilterButton onClick={handleFilterButton} color='primary'>
                    등록
                  </FilterButton>
                )}
              </div>

              <StyledFilterDiv>
                <div>
                  <Select
                    options={selectOptions}
                    onChange={handleFilter}
                    defaultValue={selectOptions[0]}
                  />
                </div>
              </StyledFilterDiv>
            </StyledMainButtonDiv>

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
              <Pagination
                currentPage={2}
                totalPages={5}
                perPage={6}
                count={5}
                onPageChange={() => {}}
              />
            </StyledPagenationDiv>
          </div>
        </div>
      </StyledUser>
    </>
  );
}

const StyledMainButtonDiv = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  height: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & .mainButtonDiv {
    width: 100%;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    flex-direction: column;
    justify-content: center;
    margin: 10px 0;

    & .mainButtonDiv {
      display: flex;
      flex-direction: row;
      justify-content: center;
      padding: 10px 0;
    }
  }
`;

const StyledFilterDiv = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
`;

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

  & .storeInfoTagDiv {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
  }

  & .storeInfoDiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
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
    p,
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
      height: 100%;
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
`;

const StyledUser = styled.div`
  width: 100%;
  height: calc(100vh - 90px);
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
    height: auto;

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
