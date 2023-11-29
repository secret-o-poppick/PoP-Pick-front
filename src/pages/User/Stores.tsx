import styled from 'styled-components';
import { BsFilterLeft } from 'react-icons/bs';
import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';

import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { StoreTag } from '@/components/Tag';
import FilterButton from '@/components/FilterButton';

/**
 * TODO :추후 팝업 스토어 이미지로 바뀔 예정
 */
import logoImg from '@/assets/logo.svg';

export default function Stores() {
  const stores = [{ title: '도구리 막내 클럽' }];

  const handleFilterButton = () => {
    console.log('Filter Button click');
  };

  const handleLastestFilter = () => {
    console.log('최신순으로 정렬');
  };

  return (
    <>
      <StyledMainButtonDiv>
        <div className='mainButtonDiv'>
          <FilterButton onClick={handleFilterButton}>전체</FilterButton>
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
        <div className='filterCategoryButton'>필터 버튼 여러개</div>

        <StyledLastestFilterDiv onClick={handleLastestFilter}>
          <BsFilterLeft size='25' />
          <span>최신 오픈 순</span>
        </StyledLastestFilterDiv>
      </StyledMainButtonDiv>

      <StyledMainStoreList>
        <StyledStoreRoWDiv>
          <div className='storeInfoDiv'>
            <div className='storeInfoTagDiv'>
              <StoreTag color='popup' title='팝업' />
            </div>
            <img src={logoImg} />

            <div className='storeInfoContents'>
              <h3>도구리 막내 클럽 ...</h3>
              <p>2023.10.20 ~ 2023.10.30</p>
              <p>서울시 성동구</p>
              <div className='storeIconsDiv'>
                <FaRegHeart style={{ marginRight: 10 }} />
                <FaRegBookmark />
              </div>
            </div>
          </div>

          <div className='storeInfoDiv'>
            <div className='storeInfoTagDiv'>
              <StoreTag color='exhibit' title='전시' />
            </div>
            <img src={logoImg} />

            <div className='storeInfoContents'>
              <h3>UFF : Feel House</h3>
              <p>2023.10.20 ~ 2023.10.30</p>
              <p>서울시 성동구</p>
              <div className='storeIconsDiv'>
                <FaRegHeart style={{ marginRight: 10 }} />
                <FaRegBookmark />
              </div>
            </div>
          </div>

          <div className='storeInfoDiv'>
            <div className='storeInfoTagDiv'>
              <StoreTag color='popup' title='팝업' />
            </div>
            <img src={logoImg} />

            <div className='storeInfoContents'>
              <h3>UFF : Feel House</h3>
              <p>2023.10.20 ~ 2023.10.30</p>
              <p>서울시 성동구</p>
              <div className='storeIconsDiv'>
                <FaRegHeart style={{ marginRight: 10 }} />
                <FaRegBookmark />
              </div>
            </div>
          </div>

          <div className='storeInfoDiv'>
            <div className='storeInfoTagDiv'>
              <StoreTag color='popup' title='팝업' />
              <div className='tagMargin'>
                <StoreTag color='adult' title='성인' />
              </div>
            </div>
            <img src={logoImg} />

            <div className='storeInfoContents'>
              <h3>UFF : Feel House</h3>
              <p>2023.10.20 ~ 2023.10.30</p>
              <p>서울시 성동구</p>
              <div className='storeIconsDiv'>
                <FaRegHeart style={{ marginRight: 10 }} />
                <FaRegBookmark />
              </div>
            </div>
          </div>
        </StyledStoreRoWDiv>
      </StyledMainStoreList>
    </>
  );
}

const StyledStoreRoWDiv_grid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 25%);
`;

const StyledStoreRoWDiv = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  & .storeInfoTagDiv {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
  }

  & .storeInfoDiv .tagMargin {
    margin-right: 140px;
  }

  & > .storeInfoDiv img {
    border: 1px solid black;
    width: 250px;
    height: 250px;
  }

  & .storeIconsDiv {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      flex-direction: column;
      position: relative;
    }

    & .storeInfoDiv {
      margin-bottom: 20px;
      width: 100%;
      display: flex;
      flex-direction: row;
    }

    & .storeInfoDiv .tagMargin {
      margin-right: 120px;
    }

    & .storeInfoTagDiv {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      position: absolute;
    }

    & > .storeInfoDiv img {
      border: 1px solid black;
      margin-right: 10px;
      width: 150px;
      height: 150px;
    }

    & > .storeInfoDiv > .storeInfoContents {
      height: 130px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }
`;

const StyledMainStoreList = styled.div`
  padding: 0 50px;

  @media (max-width: ${MEDIA_LIMIT}) {
    & {
      padding: 0 25px;
    }
  }
`;

const StyledMainButtonDiv = styled.div`
  box-sizing: border-box;
  background-color: white;
  width: 100%;
  height: 100px;
  padding: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & .filterCategoryButton {
    display: none;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    .mainButtonDiv {
      display: none;
    }
    .filterCategoryButton {
      display: block;
    }
  }
`;

const StyledLastestFilterDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > span {
    margin-left: 5px;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    & > span {
      size: 0.7rem;
    }
    & > span {
      font-size: 0.7rem;
    }
  }
`;
