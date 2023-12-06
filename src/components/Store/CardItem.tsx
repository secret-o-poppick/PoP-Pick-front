import { FaRegBookmark, FaBookmark, FaRegHeart, FaHeart } from 'react-icons/fa';
import styled from 'styled-components';
import axios from 'axios';
import { MEDIA_LIMIT } from '@/assets/styleVariable';
import { REACT_APP_BACKEND_HOST } from '@/assets/config';
import CardIcon from '@/components/Store/CardIcon';
import { useAuth } from '@/context/AuthContext';
import { formatDate } from '@/utils';
import { StoreType } from '@/types';

type CardItemProps = {
  _id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  likes: number;
};
    
type HandleClick = () => Promise<number> | Promise<void>;

export default function CardItem({
  _id,
  title,
  startDate,
  endDate,
  likes,
}: CardItemProps) {
  const { accessToken, user, getUserInfo } = useAuth();

  const handleClickLikesCount: HandleClick = async () => {
    const res = await axios.put<StoreType>(
      `${REACT_APP_BACKEND_HOST}/api/stores/${_id}/likes`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    await getUserInfo();
    return res.data.likes;
  };

  const handleClickBookMarksCount: HandleClick = async () => {
    await axios.put<StoreType>(
      `${REACT_APP_BACKEND_HOST}/api/stores/${_id}/bookmarks`,
      null,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    await getUserInfo();
  };

  return (
    <Container>
      <h3>{title}</h3>
      <p>
        {formatDate(startDate)} - {formatDate(endDate)}
      </p>
      <p>주소</p>
      <CardIconWrapper>
        <CardIcon
          icon={FaRegHeart}
          count={likes}
          onClick={handleClickLikesCount}
          color='#FF5C40'
          selected={user?.likes?.includes(_id)}
          selectedIcon={FaHeart}
        />
        <CardIcon
          icon={FaRegBookmark}
          onClick={handleClickBookMarksCount}
          color='#1778F2'
          selected={user?.bookmarks?.includes(_id)}
          selectedIcon={FaBookmark}
        />
      </CardIconWrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & > h3 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
  }

  & > p {
    color: #737373;
  }

  @media (max-width: ${MEDIA_LIMIT}) {
    flex: 1;
    margin-top: 1.8rem;

    & > h3 {
      font-size: 0.9rem;
    }

    & > p {
      font-size: 0.8rem;
    }
  }
`;

const CardIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 0.5rem;
`;
