import { formatDate } from '@/utils';
import { StoreTag } from './Tag';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

//icons
import { FaRegHeart, FaRegBookmark } from 'react-icons/fa';
import { MEDIA_LIMIT } from '@/assets/styleVariable';

import { StoreType } from '@/types';

export default function StoreCard({ storeData }: { storeData: StoreType }) {
  return (
    <StyledCard>
      <div className='tags'>
        <div>
          <StoreTag
            // color={storeData.categoryId.type}
            color={'popup'}
            title={storeData.categoryId.name}
          />
          {storeData.adultVerification && (
            <StoreTag color='adult' title='성인' />
          )}
        </div>
      </div>

      <Link className='imgLink' to={`/stores/${storeData._id}`}>
        <img src={storeData.images.find((img) => img.isMain)?.url} />
      </Link>

      <div className='contents'>
        <Link to={`/stores/${storeData._id}`}>
          <h3>{storeData.title}</h3>
        </Link>
        <p>
          {formatDate(storeData.startDate)} ~ {formatDate(storeData.endDate)}
        </p>
        <p>{storeData.address.detail1}</p>
        <div className='btnsWrapper'>
          <div className='btns'>
            <FaRegHeart />
            <div>{storeData.likes}</div>
          </div>
          <div className='btns'>
            <FaRegBookmark />
          </div>
        </div>
      </div>
    </StyledCard>
  );
}

const StyledCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding: 1em;
  .tags {
    width: 100%;
    display: flex;
    position: absolute;
    & > div {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      margin: 0 1em;
    }
    .tagMargin {
      margin-right: 140px;
    }
  }
  .imgLink {
    width: 100%;
    height: 100%;
    height: 60%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 10px;
      object-fit: cover;
    }
  }

  .contents {
    width: 100%;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    padding-top: 10px;
    a {
      color: black;
    }
    h3,
    p {
      width: 100%;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }

  .btnsWrapper {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    .btns {
      display: flex;
      flex-direction: column;
      svg {
        width: 16px;
        height: 16px;
      }
      div {
        width: 100%;
        font-size: 10px;
        text-align: center;
      }
    }
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    display: flex;
    flex-direction: row;
    align-items: normal;
    gap: 1em;
    padding: 0 0 1em 0;
    .tags {
      width: 100%;
      position: absolute;
      top: 0;
      right: 0;
      & > div {
        margin: 0;
      }
      .tagMargin {
        margin-right: 105px;
      }
    }
    .imgLink {
      width: 50%;
      height: 100%;
    }

    .contents {
      height: 100%;
      width: 50%;
      padding-top: 35px;
    }
  }
`;
