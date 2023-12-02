import styled from 'styled-components';
import Select from 'react-select';

import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';

import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { StoreTag } from '@/components/Tag';
import FilterButton from '@/components/FilterButton';

import { data } from '@/data/stores';
import { useState } from 'react';

interface optionsProp {
  value: string;
  label: string;
}

export default function Stores() {
  const selectOptions = [
    {
      value: 'latest',
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

  const [stores, setStores] = useState(data);

  const handleFilterButton = () => {
    console.log('Filter Button click');
  };

  const handleFilter = (e: optionsProp | null) => {
    console.log(`${e?.label}으로 필터링 : value = ${e?.value}`);
  };

  return (
    <>
      <StyledMainButtonDiv>
        <div className='mainButtonDiv'>
          <FilterButton onClick={handleFilterButton} color='primary'>
            전시
          </FilterButton>
          <FilterButton onClick={handleFilterButton} color='notice'>
            팝업
          </FilterButton>
          <FilterButton onClick={handleFilterButton} color='error'>
            성인
          </FilterButton>
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

      <StyledMainStoreGrid>
        {stores.map((store, index) => {
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
      </StyledMainStoreGrid>

      <StyledPagenationDiv>페이지네이션 들어갈 자리</StyledPagenationDiv>
    </>
  );
}

const StyledPagenationDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
`;

const StyledMainStoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  padding: 0 50px;
  margin-bottom: 20px;

  & .storeInfoTagDiv {
    width: 100%;
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
    padding: 1rem;
  }

  & .storeInfoDiv .tagMargin {
    margin-right: 140px;
  }

  & > .storeInfoDiv img {
    border: 1px solid black;
    border-radius: 10px;
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
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
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      padding: 0 25px;
      grid-template-columns: repeat(1, 100%);
      position: relative;
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

const StyledMainButtonDiv = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  height: 100px;
  padding: 75px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${MEDIA_LIMIT}) {
    flex-direction: column;
    justify-content: center;
    padding: 50px;
    margin: 20px 0;
  }
`;

const StyledFilterDiv = styled.div`
  display: flex;
  width: 350px;
  flex-direction: column;
  justify-content: flex-end;
  cursor: pointer;
  margin-top: 20px;

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
